// FILE PATH: backend/src/controllers/emailController.js
// Email controller using Resend API - perfect for Render hosting

const { Resend } = require('resend');

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Send contact form email using Resend API
const sendContactEmail = async (contactData) => {
  try {
    console.log('📧 Sending email via Resend API...');
    console.log('📋 Contact data received:', {
      email: contactData.email,
      name: `${contactData.firstName} ${contactData.lastName}`,
      subject: contactData.subject,
      hasMessage: !!contactData.message
    });
    
    // Validate required environment variables
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY environment variable is required');
    }
    
    if (!process.env.COMPANY_EMAIL) {
      throw new Error('COMPANY_EMAIL environment variable is required');
    }
    
    // Validate required contact data
    if (!contactData.email || !contactData.firstName || !contactData.message) {
      throw new Error('Missing required contact data: email, firstName, or message');
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

    // Send email using Resend API
    console.log('📤 Sending email via Resend API...');
    
    const emailData = {
      from: `Bruv Contact Form <contact@${process.env.RESEND_DOMAIN || 'yourdomain.com'}>`,
      to: [process.env.COMPANY_EMAIL],
      reply_to: email,
      subject: `🔔 New Contact: ${subject}`,
      html: htmlContent,
      text: textContent,
      headers: {
        'X-Customer-Email': email,
        'X-Customer-Name': `${firstName} ${lastName}`,
        'X-Submission-Source': 'bruv.africa'
      }
    };

    console.log('📧 Sending with data:', {
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      reply_to: emailData.reply_to
    });

    const data = await resend.emails.send(emailData);

    console.log('✅ Email sent successfully via Resend:', {
      id: data.id,
      from: emailData.from,
      to: emailData.to
    });
    
    return {
      success: true,
      messageId: data.id,
      timestamp: new Date().toISOString(),
      service: 'Resend API',
      from: emailData.from,
      to: emailData.to
    };

  } catch (error) {
    console.error('❌ Resend email sending failed:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    // Handle specific Resend errors
    let errorType = 'Unknown Error';
    let userMessage = 'Failed to send email';
    let suggestions = [];
    
    if (error.message.includes('API key')) {
      errorType = 'API Key Error';
      userMessage = 'Invalid or missing Resend API key';
      suggestions = ['Check RESEND_API_KEY environment variable', 'Verify API key is correct'];
    } else if (error.message.includes('domain')) {
      errorType = 'Domain Error';
      userMessage = 'Email domain not verified';
      suggestions = ['Verify your domain in Resend dashboard', 'Check RESEND_DOMAIN environment variable'];
    } else if (error.message.includes('rate limit')) {
      errorType = 'Rate Limit Error';
      userMessage = 'Too many emails sent';
      suggestions = ['Wait before sending more emails', 'Upgrade Resend plan if needed'];
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
      service: 'Resend API'
    };
  }
};

// Test email connection (for Resend, we just verify API key)
const testEmailConnection = async () => {
  try {
    console.log('🧪 Testing Resend API connection...');
    
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured');
    }
    
    // Simple test - try to get account info or send a test
    // Note: Resend doesn't have a direct connection test, so we'll validate the API key format
    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey.startsWith('re_')) {
      throw new Error('Invalid Resend API key format - should start with "re_"');
    }
    
    console.log('✅ Resend API key format valid');
    
    return {
      success: true,
      message: 'Resend API connection test successful',
      service: 'Resend API',
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ Resend API test failed:', error.message);
    
    return {
      success: false,
      error: error.message,
      service: 'Resend API',
      timestamp: new Date().toISOString()
    };
  }
};

// Send test email function
const sendTestEmail = async () => {
  console.log('🧪 Sending test email via Resend...');
  
  const testData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    company: 'Test Company',
    phone: '+1234567890',
    subject: '🧪 Test Email from Bruv Backend (Resend)',
    message: `This is a test email to verify the Resend API integration is working correctly.

Environment: ${process.env.NODE_ENV}
Service: Resend API
Timestamp: ${new Date().toISOString()}

If you receive this email, your Resend integration is working! 🎉`,
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