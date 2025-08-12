// src/app/api/moodle/enroll/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { generatePassword } from '@/lib/moodle';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log('Enrollment request data:', JSON.stringify(data, null, 2));
    
    // Extract and validate required fields
    const {
      firstName,
      lastName,
      email,
      country
    } = data;
    
    // Validate required fields
    if (!firstName || !lastName || !email || !country) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Missing required fields. Please check firstName, lastName, email, and country.' 
        },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address format.' },
        { status: 400 }
      );
    }
    
    // Step 1: Check if user already exists in Moodle
    const checkParams = {
      wstoken: process.env.MOODLE_API_TOKEN,
      wsfunction: 'core_user_get_users_by_field',
      moodlewsrestformat: 'json',
      field: 'email',
      'values[0]': email
    };
    
    console.log('Checking if user exists in Moodle...');
    const checkResponse = await axios.get(`${process.env.MOODLE_URL}/webservice/rest/server.php`, {
      params: checkParams
    });
    
    console.log('User check response:', JSON.stringify(checkResponse.data, null, 2));
    
    let userId;
    let isNewUser = false;
    let password;
    let username;
    
    // Handle user creation or existing user
    if (Array.isArray(checkResponse.data) && checkResponse.data.length === 0) {
      // User doesn't exist, create new user
      console.log('User does not exist, creating new user...');
      isNewUser = true;
      
      // Generate unique username and secure password
      const timestamp = Date.now().toString().slice(-6);
      username = `${email.split('@')[0]}_${timestamp}`;
      password = generatePassword();
      
      // Create user in Moodle
      const createParams = {
        wstoken: process.env.MOODLE_API_TOKEN,
        wsfunction: 'core_user_create_users',
        moodlewsrestformat: 'json',
        'users[0][username]': username,
        'users[0][password]': password,
        'users[0][firstname]': firstName,
        'users[0][lastname]': lastName,
        'users[0][email]': email,
        'users[0][auth]': 'manual',
        'users[0][country]': country
      };
      
      console.log('Creating user with params:', {
        ...createParams,
        'users[0][password]': '[REDACTED]'
      });
      
      const createResponse = await axios.get(`${process.env.MOODLE_URL}/webservice/rest/server.php`, { 
        params: createParams
      });
      
      console.log('User creation response:', JSON.stringify(createResponse.data, null, 2));
      
      // Check for Moodle API errors
      if (createResponse.data?.exception) {
        throw new Error(`Moodle user creation failed: ${createResponse.data.message}`);
      }
      
      // Extract user ID from response
      if (Array.isArray(createResponse.data) && createResponse.data.length > 0 && createResponse.data[0].id) {
        userId = createResponse.data[0].id;
        console.log(`New user created with ID: ${userId}`);
      } else {
        throw new Error('Unexpected response format from Moodle user creation API');
      }
      
    } else if (Array.isArray(checkResponse.data) && checkResponse.data.length > 0) {
      // User already exists
      userId = checkResponse.data[0].id;
      username = checkResponse.data[0].username;
      console.log(`Existing user found with ID: ${userId} and username: ${username}`);
      
    } else if (checkResponse.data?.exception) {
      throw new Error(`Moodle user check failed: ${checkResponse.data.message}`);
    } else {
      throw new Error('Unexpected response format from Moodle user check API');
    }
    
    // Step 2: Enroll user in the course
    console.log(`Enrolling user ${userId} in course ${process.env.MOODLE_COURSE_ID}...`);
    
    const enrollParams = {
      wstoken: process.env.MOODLE_API_TOKEN,
      wsfunction: 'enrol_manual_enrol_users',
      moodlewsrestformat: 'json',
      'enrolments[0][roleid]': 5, // Student role ID
      'enrolments[0][userid]': userId,
      'enrolments[0][courseid]': process.env.MOODLE_COURSE_ID
    };
    
    const enrollResponse = await axios.get(`${process.env.MOODLE_URL}/webservice/rest/server.php`, {
      params: enrollParams
    });
    
    console.log('Enrollment response:', JSON.stringify(enrollResponse.data, null, 2));
    
    // Check for enrollment errors
    if (enrollResponse.data?.exception) {
      throw new Error(`Moodle course enrollment failed: ${enrollResponse.data.message}`);
    }
    
    // Step 3: Log enrollment data for analytics (minimal data now)
    console.log('Enrollment data stored:', {
      userId,
      email,
      country,
      enrollmentDate: new Date().toISOString()
    });
    
    // TODO: Store this data in your own database for analytics/reporting
    
    // Step 4: Send welcome email
    console.log('Enrollment successful! Sending welcome email...');
    
    try {
      await sendWelcomeEmail({
        to: email,
        firstName: firstName,
        password: password, // Will be undefined for existing users
        loginUrl: process.env.MOODLE_LOGIN_URL,
        isNewUser: isNewUser,
        username: username
      });
      
      console.log('Welcome email sent successfully!');
    } catch (emailError) {
      console.error('Warning: Email sending failed, but enrollment was successful:', emailError);
      // Don't fail the entire process if email fails
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Enrollment completed successfully',
      data: {
        userId,
        isNewUser,
        loginUrl: process.env.MOODLE_LOGIN_URL
      }
    });
    
  } catch (error) {
    console.error('Enrollment error:', error);
    
    // Return appropriate error message
    let errorMessage = 'An unexpected error occurred during enrollment. Please try again.';
    
    if (error instanceof Error) {
      if (error.message.includes('Moodle')) {
        errorMessage = 'There was an issue with the learning management system. Please try again later.';
      } else if (error.message.includes('email')) {
        errorMessage = 'Enrollment was successful, but we had trouble sending the welcome email. Please check your email or contact support.';
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}