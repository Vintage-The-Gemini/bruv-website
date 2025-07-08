// FILE PATH: backend/src/controllers/emailController.js
// Fixed email controller using Resend API with proper domain handling

const nodemailer = require('nodemailer');

// Conditional Resend import
let Resend, resend;
try {
  if (process.env.NODE_ENV === 'production' || process.env.RESEND_API_KEY) {
    const { Resend: ResendClass } = require('resend');
    Resend = ResendClass;
    if (process.env.RESEND_API_KEY) {
      resend = new Resend(process.env.RESEND_API_KEY);
      console.log('✅ Resend initialized for production');
    }
  }
} catch (error) {
  console.log('📧 Resend not available, using SMTP for local development');
}

// Create SMTP transporter for local development
const createSMTPTransporter = () => {
  const port = parseInt(process.env.SMTP_PORT) || 587;
  
  console.log('🔧 Creating SMTP transporter with config:', {
    host: process.env.SMTP_HOST,
    port: port,
    user: process.env.SMTP_USER ? 'SET' : 'NOT SET',
    pass: process.env.SMTP_PASS ? 'SET' : 'NOT SET'
  });
  
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send email using appropriate service
const sendContactEmail = async (contactData) => {
  try {
    console.log('📧 Determining email service...');
    console.log('🌍 Environment:', process.env.NODE_ENV);
    console.log('🔑 Resend API Key:', process.env.RESEND_API_KEY ? 'Present' : 'Missing');
    console.log('📮 SMTP Host:', process.env.SMTP_HOST ? 'Present' : 'Missing');
    
    // Validate required contact data
    if (!contactData.email || !contactData.firstName || !contactData.message) {
      throw new Error('Missing required contact data: email, firstName, or message');
    }

    if (!process.env.COMPANY_EMAIL) {
      throw new Error('COMPANY_EMAIL environment variable is required');
    }

    // Decide which email service to use
    const useResend = process.env.NODE_ENV === 'production' || 
                     (process.env.RESEND_API_KEY && process.env.USE_RESEND !== 'false');
    
    if (useResend && resend) {
      console.log('📤 Using Resend API for email sending');
      return await sendViaResend(contactData);
    } else if (process.env.SMTP_HOST) {
      console.log('📤 Using SMTP for email sending');
      return await sendViaSMTP(contactData);
    } else {
      throw new Error('No email service configured. Need either RESEND_API_KEY or SMTP credentials.');
    }

  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
};

// Send via Resend API
const sendViaResend = async (contactData) => {
  try {
    console.log('📧 Starting Resend email sending process...');
    
    if (!resend) {
      throw new Error('Resend service not initialized - check API key');
    }

    const {
      firstName, lastName, email, company, phone, subject, message,
      serviceInterest, timestamp, userAgent, ipAddress
    } = contactData;

    const htmlContent = createEmailHTML(contactData);
    const textContent = createEmailText(contactData);

    // Use Resend's verified test domain or your verified domain
    const fromEmail = process.env.RESEND_DOMAIN 
      ? `Bruv Contact Form <contact@${process.env.RESEND_DOMAIN}>`
      : `Bruv Contact Form <onboarding@resend.dev>`; // Resend's pre-verified test domain

    const emailData = {
      from: fromEmail,
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

    console.log('📧 Sending with Resend data:', {
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      reply_to: emailData.reply_to
    });

    const data = await resend.emails.send(emailData);

    console.log('📬 Resend API response:', JSON.stringify(data, null, 2));

    // Check if Resend actually sent the email
    if (!data || (!data.id && !data.data?.id)) {
      console.error('❌ Resend API failed - no email ID returned');
      console.error('Full response:', data);
      throw new Error('Resend API failed to return email ID - email may not have been sent');
    }

    const emailId = data.id || data.data?.id;
    console.log('✅ Email sent successfully via Resend:', emailId);

    return {
      success: true,
      messageId: emailId,
      service: 'Resend API',
      timestamp: new Date().toISOString(),
      from: emailData.from,
      to: emailData.to
    };

  } catch (error) {
    console.error('❌ Resend email sending failed:', error);
    
    // Handle specific Resend errors
    let errorType = 'Unknown Error';
    let userMessage = 'Failed to send email via Resend';
    
    if (error.message.includes('API key')) {
      errorType = 'API Key Error';
      userMessage = 'Invalid Resend API key';
    } else if (error.message.includes('domain')) {
      errorType = 'Domain Error';
      userMessage = 'Email domain not verified';
    } else if (error.message.includes('rate limit')) {
      errorType = 'Rate Limit Error';
      userMessage = 'Too many emails sent';
    }

    return {
      success: false,
      error: error.message,
      errorType: errorType,
      userMessage: userMessage,
      service: 'Resend API',
      timestamp: new Date().toISOString()
    };
  }
};

// Send via SMTP
const sendViaSMTP = async (contactData) => {
  try {
    console.log('📧 Starting SMTP email sending process...');
    
    const transporter = createSMTPTransporter();
    
    // Test connection
    try {
      await transporter.verify();
      console.log('✅ SMTP connection verified');
    } catch (verifyError) {
      console.log('⚠️ SMTP verification failed, attempting send anyway:', verifyError.message);
    }

    const htmlContent = createEmailHTML(contactData);
    const textContent = createEmailText(contactData);

    const mailOptions = {
      from: `"Bruv Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.COMPANY_EMAIL,
      replyTo: contactData.email,
      subject: `🔔 New Contact: ${contactData.subject}`,
      html: htmlContent,
      text: textContent,
      headers: {
        'X-Customer-Email': contactData.email,
        'X-Customer-Name': `${contactData.firstName} ${contactData.lastName}`,
        'X-Submission-Source': 'bruv.africa'
      }
    };

    console.log('📧 Sending via SMTP with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      replyTo: mailOptions.replyTo
    });

    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email sent successfully via SMTP:', {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected
    });

    return {
      success: true,
      messageId: info.messageId,
      service: 'SMTP',
      timestamp: new Date().toISOString(),
      accepted: info.accepted,
      rejected: info.rejected
    };

  } catch (error) {
    console.error('❌ SMTP email sending failed:', error);
    
    return {
      success: false,
      error: error.message,
      errorType: 'SMTP Error',
      userMessage: 'Failed to send email via SMTP',
      service: 'SMTP',
      timestamp: new Date().toISOString(),
      code: error.code
    };
  }
};

// Create HTML email content
const createEmailHTML = (contactData) => {
  const { firstName, lastName, email, company, phone, subject, message, serviceInterest, timestamp, ipAddress, userAgent } = contactData;
  
  return `
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
};

// Create text email content
const createEmailText = (contactData) => {
  const { firstName, lastName, email, company, phone, subject, message, serviceInterest, timestamp, ipAddress } = contactData;
  
  return `
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
Timestamp: ${timestamp}
Form Source: Bruv Africa Website Contact Form

---
This email was automatically generated from the Bruv Africa website contact form.
Reply directly to this email to respond to the sender.

© ${new Date().getFullYear()} Bruv Africa. All rights reserved.
  `;
};

// Test email connection
const testEmailConnection = async () => {
  try {
    if (process.env.NODE_ENV === 'production' || (process.env.RESEND_API_KEY && process.env.USE_RESEND !== 'false')) {
      if (!resend) {
        throw new Error('Resend not initialized - check API key');
      }
      return {
        success: true,
        service: 'Resend API',
        message: 'Resend API ready',
        from: process.env.RESEND_DOMAIN 
          ? `contact@${process.env.RESEND_DOMAIN}`
          : 'onboarding@resend.dev'
      };
    } else {
      const transporter = createSMTPTransporter();
      await transporter.verify();
      return {
        success: true,
        service: 'SMTP',
        message: 'SMTP connection successful'
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      service: process.env.NODE_ENV === 'production' ? 'Resend API' : 'SMTP'
    };
  }
};

// Send test email
const sendTestEmail = async () => {
  const testData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    company: 'Test Company',
    phone: '+1234567890',
    subject: '🧪 Test Email from Bruv Backend',
    message: `This is a test email to verify email functionality.

Environment: ${process.env.NODE_ENV}
Service: ${process.env.RESEND_API_KEY ? 'Resend API' : 'SMTP'}
Timestamp: ${new Date().toISOString()}

If you receive this email, your email service is working! 🎉`,
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