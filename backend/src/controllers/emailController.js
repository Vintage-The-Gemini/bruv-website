// FILE PATH: backend/src/controllers/emailController.js
// Complete email handling and sending logic using Nodemailer with enhanced error handling for domain email

const nodemailer = require('nodemailer');

// Create transporter with SMTP configuration optimized for domain email
const createTransporter = () => {
  const port = parseInt(process.env.SMTP_PORT) || 587;
  const isSSL = port === 465;
  
  console.log('🔧 Creating SMTP transporter with config:', {
    host: process.env.SMTP_HOST,
    port: port,
    secure: isSSL,
    user: process.env.SMTP_USER ? 'SET' : 'NOT SET',
    pass: process.env.SMTP_PASS ? 'SET' : 'NOT SET'
  });

  const config = {
    host: process.env.SMTP_HOST,
    port: port,
    secure: isSSL, // true for 465 (SSL), false for 587 (TLS) and others
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Important for self-signed certificates on domain email
      servername: process.env.SMTP_HOST, // Explicitly set servername for domain email
      ciphers: 'SSLv3' // Support older cipher suites for compatibility
    },
    connectionTimeout: 30000, // 30 seconds - longer for domain email
    greetingTimeout: 15000, // 15 seconds
    socketTimeout: 30000, // 30 seconds
    debug: process.env.NODE_ENV === 'development', // Enable debug in development
    logger: process.env.NODE_ENV === 'development'
  };

  // For TLS connections (port 587), ensure proper TLS handling
  if (!isSSL && port === 587) {
    config.requireTLS = true;
    config.tls.minVersion = 'TLSv1';
  }

  // Handle alternative ports for domain email
  if (port === 25) {
    config.secure = false;
    config.ignoreTLS = false;
    config.requireTLS = false;
  }

  return nodemailer.createTransporter(config);
};

// Test email connection with multiple fallback options
const testEmailConnection = async () => {
  try {
    console.log('🧪 Testing email connection...');
    
    const transporter = createTransporter();
    
    // Test connection
    await transporter.verify();
    console.log('✅ Email connection test passed');
    
    return {
      success: true,
      message: 'Email connection test successful',
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ Email connection test failed:', error);
    
    // Try alternative configurations
    const altConfigs = [
      { port: 587, secure: false, name: 'TLS 587' },
      { port: 465, secure: true, name: 'SSL 465' },
      { port: 25, secure: false, name: 'Plain 25' }
    ];
    
    for (const config of altConfigs) {
      try {
        console.log(`🔄 Trying alternative config: ${config.name}`);
        
        const altTransporter = nodemailer.createTransporter({
          host: process.env.SMTP_HOST,
          port: config.port,
          secure: config.secure,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
          tls: {
            rejectUnauthorized: false
          },
          connectionTimeout: 15000
        });
        
        await altTransporter.verify();
        console.log(`✅ Alternative config ${config.name} successful`);
        
        return {
          success: true,
          message: `Connection successful with ${config.name}`,
          recommendedPort: config.port,
          recommendedSecure: config.secure
        };
        
      } catch (altError) {
        console.log(`❌ Alternative config ${config.name} failed:`, altError.message);
      }
    }
    
    return {
      success: false,
      error: error.message,
      code: error.code,
      message: 'All connection attempts failed'
    };
  }
};

// Send contact form email with comprehensive error handling
const sendContactEmail = async (contactData) => {
  try {
    console.log('📧 Starting email sending process...');
    console.log('📋 Contact data received:', {
      email: contactData.email,
      name: `${contactData.firstName} ${contactData.lastName}`,
      subject: contactData.subject,
      hasMessage: !!contactData.message
    });
    
    // Validate required environment variables
    const requiredVars = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'COMPANY_EMAIL'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }
    
    // Validate required contact data
    if (!contactData.email || !contactData.firstName || !contactData.message) {
      throw new Error('Missing required contact data: email, firstName, or message');
    }

    const transporter = createTransporter();

    // Test SMTP connection first
    console.log('🔍 Verifying SMTP connection...');
    try {
      await transporter.verify();
      console.log('✅ SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('❌ SMTP verification failed:', {
        message: verifyError.message,
        code: verifyError.code,
        command: verifyError.command,
        response: verifyError.response
      });
      
      // Don't throw here, try to send anyway as some servers don't support verify
      console.log('⚠️ Verification failed, but attempting to send email anyway...');
    }

    // Prepare email content
    const {
      firstName,
      lastName,
      email,
      company,
      phone,
      subject,
      message,
      serviceInterest,
      timestamp,
      userAgent,
      ipAddress
    } = contactData;

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">🔔 New Contact Form Submission</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Bruv Africa Website</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #667eea;">
            <h2 style="color: #667eea; margin-top: 0; font-size: 20px;">📋 Contact Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold; width: 30%;">Full Name:</td>
                <td style="padding: 10px 0;">${firstName} ${lastName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold;">Email:</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold;">Company:</td>
                <td style="padding: 10px 0;">${company || '<em>Not provided</em>'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold;">Phone:</td>
                <td style="padding: 10px 0;">${phone || '<em>Not provided</em>'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold;">Service Interest:</td>
                <td style="padding: 10px 0;">${serviceInterest || '<em>Not specified</em>'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold;">Submitted:</td>
                <td style="padding: 10px 0;">${new Date(timestamp).toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZoneName: 'short'
                })}</td>
              </tr>
            </table>
          </div>

          <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #28a745;">
            <h2 style="color: #28a745; margin-top: 0; font-size: 20px;">✉️ Subject: ${subject}</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; white-space: pre-wrap; line-height: 1.8; font-size: 16px;">${message}</div>
          </div>

          <div style="background: #e9ecef; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #6c757d; margin-top: 0; font-size: 16px;">🔍 Technical Details</h3>
            <div style="font-size: 13px; color: #6c757d; line-height: 1.4;">
              <strong>IP Address:</strong> ${ipAddress || 'Unknown'}<br>
              <strong>User Agent:</strong> ${userAgent || 'Unknown'}<br>
              <strong>Timestamp:</strong> ${timestamp}<br>
              <strong>Form Source:</strong> Bruv Africa Website Contact Form
            </div>
          </div>

          <div style="text-align: center; padding: 20px; border-top: 2px solid #dee2e6;">
            <p style="color: #6c757d; font-size: 14px; margin: 0;">
              <strong>Quick Actions:</strong><br>
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 5px;">Reply to ${firstName}</a>
            </p>
          </div>
        </div>

        <div style="text-align: center; margin-top: 30px; padding: 20px; color: #6c757d; font-size: 12px;">
          <hr style="border: none; border-top: 1px solid #dee2e6; margin: 20px 0;">
          <p>This email was automatically generated from the <strong>Bruv Africa</strong> website contact form.<br>
          Reply directly to this email to respond to the sender.</p>
          <p>© ${new Date().getFullYear()} Bruv Africa. All rights reserved.</p>
        </div>
      </body>
      </html>
    `;

    const textContent = `
NEW CONTACT FORM SUBMISSION - Bruv Africa
=========================================

CONTACT INFORMATION:
-------------------
Name: ${firstName} ${lastName}
Email: ${email}
Company: ${company || 'Not provided'}
Phone: ${phone || 'Not provided'}
Service Interest: ${serviceInterest || 'Not specified'}
Submitted: ${new Date(timestamp).toLocaleString()}

SUBJECT: ${subject}
-----------------

MESSAGE:
--------
${message}

TECHNICAL DETAILS:
-----------------
IP Address: ${ipAddress || 'Unknown'}
User Agent: ${userAgent || 'Unknown'}
Timestamp: ${timestamp}
Form Source: Bruv Africa Website Contact Form

---
This email was automatically generated from the Bruv Africa website contact form.
Reply directly to this email to respond to the sender.

© ${new Date().getFullYear()} Bruv Africa. All rights reserved.
    `;

    // Email options
    const mailOptions = {
      from: `"Bruv Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.COMPANY_EMAIL,
      replyTo: email,
      subject: `🔔 New Contact: ${subject}`,
      text: textContent,
      html: htmlContent,
      headers: {
        'X-Customer-Email': email,
        'X-Customer-Name': `${firstName} ${lastName}`,
        'X-Submission-Source': 'bruv.africa',
        'X-Priority': '1',
        'Importance': 'high',
        'X-Mailer': 'Bruv Contact Form v1.0'
      }
    };

    console.log('📤 Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      replyTo: mailOptions.replyTo
    });

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email sent successfully:', {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected
    });
    
    return {
      success: true,
      messageId: info.messageId,
      timestamp: new Date().toISOString(),
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response
    };

  } catch (error) {
    console.error('❌ Email sending failed:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error command:', error.command);
    console.error('Error response:', error.response);
    console.error('Error stack:', error.stack);
    
    // Detailed error analysis for domain email issues
    let errorType = 'Unknown Error';
    let userMessage = 'Failed to send email';
    let suggestions = [];
    
    if (error.code === 'EAUTH') {
      errorType = 'Authentication Failed';
      userMessage = 'Email authentication failed';
      suggestions = [
        'Check SMTP username and password',
        'Verify email account exists',
        'Check if 2FA is enabled and app password needed'
      ];
    } else if (error.code === 'ECONNECTION' || error.code === 'ENOTFOUND') {
      errorType = 'Connection Failed';
      userMessage = 'Could not connect to email server';
      suggestions = [
        'Check SMTP host address',
        'Verify port number (try 587, 465, or 25)',
        'Check firewall settings',
        'Verify domain email server is running'
      ];
    } else if (error.code === 'ETIMEDOUT') {
      errorType = 'Connection Timeout';
      userMessage = 'Email server connection timed out';
      suggestions = [
        'Try a different port',
        'Check network connectivity',
        'Server may be overloaded'
      ];
    } else if (error.code === 'EENVELOPE') {
      errorType = 'Envelope Error';
      userMessage = 'Email address validation failed';
      suggestions = [
        'Check sender email format',
        'Verify recipient email format',
        'Check domain email configuration'
      ];
    } else if (error.message.includes('DNS')) {
      errorType = 'DNS Resolution Failed';
      userMessage = 'Could not resolve email server address';
      suggestions = [
        'Check SMTP host spelling',
        'Verify domain DNS settings',
        'Try using IP address instead of hostname'
      ];
    } else if (error.message.includes('TLS') || error.message.includes('SSL')) {
      errorType = 'TLS/SSL Error';
      userMessage = 'Secure connection failed';
      suggestions = [
        'Try different port (587 for TLS, 465 for SSL)',
        'Check SSL/TLS settings',
        'Try with rejectUnauthorized: false'
      ];
    } else if (error.message.includes('SMTP')) {
      errorType = 'SMTP Protocol Error';
      userMessage = 'SMTP server error occurred';
      suggestions = [
        'Check SMTP server configuration',
        'Verify email server supports SMTP',
        'Contact hosting provider'
      ];
    }

    console.error(`❌ Error Type: ${errorType}`);
    console.error('💡 Suggestions:', suggestions);
    
    return {
      success: false,
      error: error.message,
      errorType: errorType,
      userMessage: userMessage,
      suggestions: suggestions,
      timestamp: new Date().toISOString(),
      code: error.code || 'UNKNOWN',
      command: error.command,
      response: error.response
    };
  }
};

// Send test email function for debugging
const sendTestEmail = async () => {
  console.log('🧪 Sending test email...');
  
  const testData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    company: 'Test Company',
    phone: '+1234567890',
    subject: '🧪 Test Email from Bruv Backend',
    message: `This is a test email to verify the email configuration is working correctly.

Environment: ${process.env.NODE_ENV}
SMTP Host: ${process.env.SMTP_HOST}
Timestamp: ${new Date().toISOString()}

If you receive this email, your SMTP configuration is working! 🎉`,
    serviceInterest: 'Testing',
    timestamp: new Date().toISOString(),
    userAgent: 'Test Agent',
    ipAddress: '127.0.0.1'
  };

  return await sendContactEmail(testData);
};

module.exports = {
  sendContactEmail,
  sendTestEmail,
  testEmailConnection
};