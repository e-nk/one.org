// src/lib/moodle.ts
import axios from 'axios';

const MOODLE_URL = process.env.MOODLE_URL;
const MOODLE_TOKEN = process.env.MOODLE_API_TOKEN;

/**
 * Generates a secure random password that meets Moodle requirements
 * Requirements: At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
 */
export function generatePassword(): string {
  const length = 12;
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';
  
  const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;
  
  // Ensure we have at least one character from each required group
  let password = '';
  password += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
  password += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
  password += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
  password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
  
  // Fill the remaining length with random characters
  for (let i = password.length; i < length; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
  }
  
  // Shuffle the password to avoid predictable patterns
  return password.split('').sort(() => 0.5 - Math.random()).join('');
}

/**
 * Interface for creating a Moodle user
 */
interface CreateMoodleUserParams {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  country: string;
}

/**
 * Creates a new user in Moodle
 * Returns the user ID if successful
 */
export async function createMoodleUser({
  firstname,
  lastname,
  email,
  password,
  country
}: CreateMoodleUserParams): Promise<number> {
  try {
    // Generate unique username to avoid conflicts
    const timestamp = Date.now().toString().slice(-6);
    const username = `${email.split('@')[0]}_${timestamp}`;
    
    console.log('Creating Moodle user:', {
      firstname,
      lastname,
      email,
      username,
      country,
      passwordLength: password?.length
    });
    
    const params = {
      wstoken: MOODLE_TOKEN,
      wsfunction: 'core_user_create_users',
      moodlewsrestformat: 'json',
      'users[0][username]': username,
      'users[0][password]': password,
      'users[0][firstname]': firstname,
      'users[0][lastname]': lastname,
      'users[0][email]': email,
      'users[0][auth]': 'manual',
      'users[0][country]': country
    };
    
    const response = await axios.get(`${MOODLE_URL}/webservice/rest/server.php`, { 
      params 
    });
    
    console.log('Moodle user creation response:', JSON.stringify(response.data, null, 2));
    
    // Check for API errors
    if (response.data?.exception) {
      throw new Error(`Moodle API error: ${response.data.message}`);
    }
    
    // Extract user ID from successful response
    if (Array.isArray(response.data) && response.data.length > 0 && response.data[0].id) {
      return response.data[0].id;
    } else {
      throw new Error('Unexpected response format from Moodle user creation API');
    }
  } catch (error) {
    console.error('Moodle user creation failed:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Moodle API response data:', error.response.data);
    }
    throw new Error(`Failed to create user in Moodle: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Interface for enrolling a user in a course
 */
interface EnrollUserParams {
  userId: number;
  courseId: number;
  roleId?: number; // Defaults to 5 (student)
}

/**
 * Enrolls a user in a Moodle course
 * Returns true if successful
 */
export async function enrollUserInCourse({
  userId,
  courseId,
  roleId = 5 // Default to student role
}: EnrollUserParams): Promise<boolean> {
  try {
    console.log(`Enrolling user ${userId} in course ${courseId} with role ${roleId}`);
    
    const params = {
      wstoken: MOODLE_TOKEN,
      wsfunction: 'enrol_manual_enrol_users',
      moodlewsrestformat: 'json',
      'enrolments[0][roleid]': roleId,
      'enrolments[0][userid]': userId,
      'enrolments[0][courseid]': courseId
    };
    
    const response = await axios.get(`${MOODLE_URL}/webservice/rest/server.php`, {
      params
    });
    
    console.log('Moodle enrollment response:', JSON.stringify(response.data, null, 2));
    
    // Check for API errors
    if (response.data?.exception) {
      throw new Error(`Moodle enrollment API error: ${response.data.message}`);
    }
    
    return true;
  } catch (error) {
    console.error('Moodle course enrollment failed:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Moodle enrollment API response data:', error.response.data);
    }
    throw new Error(`Failed to enroll user in course: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Checks if a user exists in Moodle by email
 * Returns user data if found, null if not found
 */
export async function checkUserExists(email: string): Promise<any | null> {
  try {
    console.log(`Checking if user exists with email: ${email}`);
    
    const params = {
      wstoken: MOODLE_TOKEN,
      wsfunction: 'core_user_get_users_by_field',
      moodlewsrestformat: 'json',
      field: 'email',
      'values[0]': email
    };
    
    const response = await axios.get(`${MOODLE_URL}/webservice/rest/server.php`, {
      params
    });
    
    console.log('Moodle user check response:', JSON.stringify(response.data, null, 2));
    
    // Check for API errors
    if (response.data?.exception) {
      throw new Error(`Moodle user check API error: ${response.data.message}`);
    }
    
    // Return user data if found, null if not found
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Moodle user check failed:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Moodle user check API response data:', error.response.data);
    }
    throw new Error(`Failed to check if user exists: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Validates that all required environment variables are set
 */
export function validateMoodleConfig(): void {
  const requiredVars = ['MOODLE_URL', 'MOODLE_API_TOKEN', 'MOODLE_COURSE_ID', 'MOODLE_LOGIN_URL'];
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required Moodle environment variables: ${missing.join(', ')}`);
  }
  
  console.log('Moodle configuration validated successfully');
}