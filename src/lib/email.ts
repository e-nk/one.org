// src/lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Interface for welcome email parameters
 */
interface WelcomeEmailParams {
  to: string;
  firstName: string;
  password?: string; // Only provided for new users
  loginUrl?: string;
  isNewUser?: boolean;
  username?: string;
}

/**
 * Sends a welcome email to newly enrolled users
 * Handles both new users (with credentials) and existing users (enrollment confirmation)
 */
export async function sendWelcomeEmail({
  to,
  firstName,
  password,
  loginUrl = process.env.MOODLE_LOGIN_URL,
  isNewUser = false,
  username
}: WelcomeEmailParams): Promise<boolean> {
  // Validate required environment variables
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }
  
  if (!process.env.EMAIL_FROM) {
    throw new Error('EMAIL_FROM environment variable is not set');
  }
  
  console.log('Sending welcome email:', {
    to,
    isNewUser,
    hasPassword: !!password,
    loginUrl
  });
  
  try {
    const subject = isNewUser 
      ? "Welcome to ONE Academy - Your Account Details" 
      : "ONE Academy - Course Enrollment Confirmation";
    
    const html = isNewUser
      ? generateNewUserEmailHtml({ firstName, username, password, loginUrl })
      : generateExistingUserEmailHtml({ firstName, loginUrl });

    const emailConfig = {
      from: process.env.EMAIL_FROM,
      to: [to],
      subject: subject,
      html: html
    };
    
    console.log('Email configuration:', {
      from: emailConfig.from,
      to: emailConfig.to,
      subject: emailConfig.subject,
      htmlLength: emailConfig.html.length
    });

    const { data, error } = await resend.emails.send(emailConfig);

    if (error) {
      console.error('Resend API error:', error);
      throw new Error(`Email sending failed: ${JSON.stringify(error)}`);
    }
    
    console.log('Welcome email sent successfully:', data);
    return true;
    
  } catch (error) {
    console.error('Welcome email error:', error);
    throw new Error(`Failed to send welcome email: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Generates HTML content for new user welcome email
 */
function generateNewUserEmailHtml({
  firstName,
  username,
  password,
  loginUrl
}: {
  firstName: string;
  username?: string;
  password?: string;
  loginUrl?: string;
}): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to ONE Academy</title>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
        }
        .header { 
          background: linear-gradient(135deg, #73165a, #10827b); 
          color: white; 
          padding: 30px 20px; 
          text-align: center; 
          border-radius: 12px 12px 0 0; 
        }
        .content { 
          background: #ffffff; 
          padding: 30px 20px; 
          border: 1px solid #e5e7eb; 
          border-radius: 0 0 12px 12px; 
        }
        .credentials-box { 
          background: #f8fafc; 
          border: 2px solid #10827b; 
          border-radius: 8px; 
          padding: 20px; 
          margin: 20px 0; 
        }
        .button { 
          display: inline-block; 
          background: #00ffd9; 
          color: #000; 
          padding: 15px 30px; 
          text-decoration: none; 
          border-radius: 8px; 
          font-weight: 600; 
          margin: 20px 0; 
        }
        .footer { 
          text-align: center; 
          margin-top: 30px; 
          padding-top: 20px; 
          border-top: 1px solid #e5e7eb; 
          color: #6b7280; 
          font-size: 14px; 
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 style="margin: 0; font-size: 28px;">Welcome to ONE Academy!</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Your journey toward creating change begins now</p>
      </div>
      
      <div class="content">
        <h2 style="color: #73165a; margin-top: 0;">Hello ${firstName}!</h2>
        
        <p>Congratulations! Your account has been created and you're now enrolled in our <strong>"Pathways to Equity"</strong> course.</p>
        
        <div class="credentials-box">
          <h3 style="color: #10827b; margin-top: 0;">Your Login Credentials</h3>
          <p><strong>Username:</strong> ${username}</p>
          <p><strong>Password:</strong> ${password}</p>
          <p style="margin-bottom: 0;"><strong>Login URL:</strong> <a href="${loginUrl}" style="color: #10827b;">${loginUrl}</a></p>
        </div>
        
        <div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; color: #92400e;"><strong>🔒 Security Tip:</strong> We recommend changing your password after your first login for enhanced security.</p>
        </div>
        
        <a href="${loginUrl}" class="button">Access Your Course</a>
        
        <h3 style="color: #73165a;">What's Next?</h3>
        <ul>
          <li>Log in to the platform using your credentials above</li>
          <li>Complete your profile setup</li>
          <li>Begin Module 1: "The Journey Begins — Understanding Equity"</li>
          <li>Join our learning community and connect with fellow changemakers</li>
        </ul>
        
        <p>If you have any questions or need assistance, don't hesitate to reach out to our support team at <a href="mailto:welcome@oneacademy.org" style="color: #10827b;">welcome@oneacademy.org</a></p>
        
        <p style="margin-top: 30px;">
          <strong>Ready to create change?</strong><br>
          The ONE Academy Team
        </p>
      </div>
      
      <div class="footer">
        <p>This email was sent from ONE Academy | <a href="https://oneacademy.org" style="color: #10827b;">oneacademy.org</a></p>
        <p>© ${new Date().getFullYear()} ONE Academy. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generates HTML content for existing user enrollment confirmation email
 */
function generateExistingUserEmailHtml({
  firstName,
  loginUrl
}: {
  firstName: string;
  loginUrl?: string;
}): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Course Enrollment Confirmation</title>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
        }
        .header { 
          background: linear-gradient(135deg, #73165a, #10827b); 
          color: white; 
          padding: 30px 20px; 
          text-align: center; 
          border-radius: 12px 12px 0 0; 
        }
        .content { 
          background: #ffffff; 
          padding: 30px 20px; 
          border: 1px solid #e5e7eb; 
          border-radius: 0 0 12px 12px; 
        }
        .button { 
          display: inline-block; 
          background: #00ffd9; 
          color: #000; 
          padding: 15px 30px; 
          text-decoration: none; 
          border-radius: 8px; 
          font-weight: 600; 
          margin: 20px 0; 
        }
        .footer { 
          text-align: center; 
          margin-top: 30px; 
          padding-top: 20px; 
          border-top: 1px solid #e5e7eb; 
          color: #6b7280; 
          font-size: 14px; 
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 style="margin: 0; font-size: 28px;">Course Enrollment Confirmed!</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Welcome back to ONE Academy</p>
      </div>
      
      <div class="content">
        <h2 style="color: #73165a; margin-top: 0;">Hello ${firstName}!</h2>
        
        <p>Great news! You have been successfully enrolled in our <strong>"Pathways to Equity"</strong> course.</p>
        
        <p>Since you already have an account with us, you can access the course immediately using your existing login credentials.</p>
        
        <a href="${loginUrl}" class="button">Access Your Course</a>
        
        <h3 style="color: #73165a;">Course Highlights</h3>
        <ul>
          <li><strong>6 Interactive Modules</strong> - From understanding equity to creating change</li>
          <li><strong>Practical Activities</strong> - Real-world applications and assessments</li>
          <li><strong>Global Community</strong> - Connect with changemakers worldwide</li>
          <li><strong>Certificate</strong> - Earn recognition upon completion</li>
        </ul>
        
        <div style="background: #ecfdf5; border: 1px solid #10827b; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
          <h3 style="color: #10827b; margin-top: 0;">Ready to Begin?</h3>
          <p style="margin-bottom: 0;">Module 1: "The Journey Begins — Understanding Equity" is waiting for you!</p>
        </div>
        
        <p>If you have any questions or need assistance, feel free to contact our support team at <a href="mailto:welcome@oneacademy.org" style="color: #10827b;">welcome@oneacademy.org</a></p>
        
        <p style="margin-top: 30px;">
          <strong>Let's create change together!</strong><br>
          The ONE Academy Team
        </p>
      </div>
      
      <div class="footer">
        <p>This email was sent from ONE Academy | <a href="https://oneacademy.org" style="color: #10827b;">oneacademy.org</a></p>
        <p>© ${new Date().getFullYear()} ONE Academy. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;
}

/**
 * Validates that all required email environment variables are set
 */
export function validateEmailConfig(): void {
  const requiredVars = ['RESEND_API_KEY', 'EMAIL_FROM'];
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required email environment variables: ${missing.join(', ')}`);
  }
  
  console.log('Email configuration validated successfully');
}

/**
 * Sends a test email to verify email configuration
 */
export async function sendTestEmail(to: string): Promise<boolean> {
  try {
    validateEmailConfig();
    
    const emailConfig = {
      from: process.env.EMAIL_FROM!,
      to: [to],
      subject: 'ONE Academy - Email Configuration Test',
      html: `
        <h1>Email Test Successful!</h1>
        <p>This is a test email to verify that your ONE Academy email configuration is working correctly.</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      `
    };

    const { data, error } = await resend.emails.send(emailConfig);

    if (error) {
      throw new Error(`Test email failed: ${JSON.stringify(error)}`);
    }
    
    console.log('Test email sent successfully:', data);
    return true;
    
  } catch (error) {
    console.error('Test email error:', error);
    throw error;
  }
}