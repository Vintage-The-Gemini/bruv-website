// FILE PATH: backend/src/controllers/emailController.js
// Email handling and sending logic using Nodemailer with enhanced error handling

const nodemailer = require('nodemailer');

// Create transporter with SMTP configuration
const createTransporter = () => {
  console.log('🔧 Creating SMTP transporter with config:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER ? 'SET' : 'NOT SET',
    pass: process.env.SMTP_PASS ? 'SET' : 'NOT SET'
  });

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
      ciphers: 'SSLv3'
    },
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 5000, // 5 seconds
    socketTimeout: 10000, // 10 seconds
  });
};

// Send contact form email
const sendContactEmail = async (contactData) => {
  try {
    console.log('📧 Starting email sending process...');
    
    const transporter = createTransporter();

    // Test SMTP connection first
    console.log('🔍 Verifying SMTP connection...');
    try {
      await transporter.verify();
      console.log('✅ SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('❌ SMTP verification failed:', verifyError.message);
      throw new Error(`SMTP Connection Failed: ${verifyError.message}`);
    }

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

    console.log('📝 Preparing email content...');

    // Email content
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            background-color: #f4f4f4; 
            margin: 0; 
            padding: 20px; 
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background: white; 
            padding: 30px; 
            border-radius: 10px; 
            box-shadow: 0 0 10px rgba(0,0,0,0.1); 
          }
          .header { 
            background: linear-gradient(135deg, #2D1B69 0%, #ef4444 100%); 
            color: white; 
            padding: 20px; 
            text-align: center; 
            border-radius: 8px; 
            margin-bottom: 30px; 
          }
          .content { margin-bottom: 30px; }
          .field { 
            margin-bottom: 15px; 
            padding: 10px; 
            background: #f8f9fa; 
            border-radius: 5px; 
            border-left: 4px solid #ef4444; 
          }
          .label { 
            font-weight: bold; 
            color: #2D1B69; 
            display: block; 
            margin-bottom: 5px; 
          }
          .value { 
            color: #555; 
            font-size: 16px; 
          }
          .message-box { 
            background: #f8f9fa; 
            padding: 20px; 
            border-radius: 8px; 
            border: 1px solid #e9ecef; 
            margin: 20px 0; 
          }
          .footer { 
            text-align: center; 
            color: #666; 
            font-size: 12px; 
            margin-top: 30px; 
            padding-top: 20px; 
            border-top: 1px solid #eee; 
          }
          .urgent { 
            background: #fff3cd; 
            border-left: 4px solid #ffc107; 
            padding: 15px; 
            margin: 20px 0; 
            border-radius: 5px; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">🔔 New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">From: bruv.africa</p>
          </div>

          <!-- Customer Information -->
          <div class="content">
            <h2 style="color: #2D1B69; margin-bottom: 20px; font-size: 20px;">📋 Customer Information</h2>
            
            <div class="field">
              <span class="label">👤 Full Name:</span>
              <span class="value">${firstName} ${lastName}</span>
            </div>

            <div class="field">
              <span class="label">📧 Email:</span>
              <span class="value"><a href="mailto:${email}" style="color: #ef4444; text-decoration: none;">${email}</a></span>
            </div>

            ${phone ? `
            <div class="field">
              <span class="label">📱 Phone:</span>
              <span class="value"><a href="tel:${phone}" style="color: #ef4444; text-decoration: none;">${phone}</a></span>
            </div>
            ` : ''}

            ${company ? `
            <div class="field">
              <span class="label">🏢 Company:</span>
              <span class="value">${company}</span>
            </div>
            ` : ''}

            ${serviceInterest ? `
            <div class="field">
              <span class="label">🎯 Service Interest:</span>
              <span class="value">${serviceInterest}</span>
            </div>
            ` : ''}

            <!-- Subject and Message -->
            <div class="urgent">
              <h3 style="color: #856404; margin: 0 0 10px 0; font-size: 18px;">📌 Subject: ${subject}</h3>
            </div>

            <div class="message-box">
              <h3 style="color: #2D1B69; margin: 0 0 15px 0; font-size: 18px;">💬 Message:</h3>
              <div style="font-size: 16px; line-height: 1.6; color: #333;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>

            <!-- Technical Details -->
            <div style="background: #e9ecef; padding: 15px; border-radius: 8px; margin-top: 30px;">
              <h4 style="color: #6c757d; margin: 0 0 10px 0; font-size: 14px;">🔧 Technical Details:</h4>
              <p style="margin: 5px 0; font-size: 12px; color: #6c757d;">
                <strong>Submitted:</strong> ${new Date(timestamp).toLocaleString()}<br>
                <strong>IP Address:</strong> ${ipAddress || 'Unknown'}<br>
                <strong>User Agent:</strong> ${userAgent || 'Unknown'}
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p style="margin: 0;">This email was automatically generated from the Bruv contact form.</p>
            <p style="margin: 5px 0 0 0;">Please respond within 24 hours for optimal customer service.</p>
            <p style="margin: 15px 0 0 0; font-size: 10px;">© 2025 Bruv Africa. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Plain text version
    const textContent = `
New Contact Form Submission from bruv.africa

Customer Information:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Phone: ${phone || 'Not provided'}
- Company: ${company || 'Not provided'}
- Service Interest: ${serviceInterest || 'Not specified'}

Subject: ${subject}

Message:
${message}

Technical Details:
- Submitted: ${new Date(timestamp).toLocaleString()}
- IP Address: ${ipAddress || 'Unknown'}
- User Agent: ${userAgent || 'Unknown'}

Please respond within 24 hours.

---
This email was automatically generated from the Bruv contact form.
© 2025 Bruv Africa. All rights reserved.
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
        'Importance': 'high'
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
      rejected: info.rejected
    };

  } catch (error) {
    console.error('❌ Email sending failed:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('Error stack:', error.stack);
    
    // Detailed error analysis
    let errorType = 'Unknown';
    let userMessage = 'Failed to send email';
    
    if (error.code === 'EAUTH') {
      errorType = 'Authentication Failed';
      userMessage = 'Email authentication failed - please check SMTP credentials';
    } else if (error.code === 'ECONNECTION') {
      errorType = 'Connection Failed';
      userMessage = 'Could not connect to email server';
    } else if (error.code === 'ETIMEDOUT') {
      errorType = 'Connection Timeout';
      userMessage = 'Email server connection timed out';
    } else if (error.message.includes('DNS')) {
      errorType = 'DNS Resolution Failed';
      userMessage = 'Could not resolve email server address';
    } else if (error.message.includes('SMTP')) {
      errorType = 'SMTP Error';
      userMessage = 'SMTP server error occurred';
    }

    console.error(`❌ Error Type: ${errorType}`);
    
    return {
      success: false,
      error: error.message,
      errorType: errorType,
      userMessage: userMessage,
      timestamp: new Date().toISOString(),
      code: error.code || 'UNKNOWN'
    };
  }
};

// Test email function for debugging
const testEmailConnection = async () => {
  try {
    console.log('🧪 Testing email connection...');
    
    const transporter = createTransporter();
    
    // Test connection
    await transporter.verify();
    console.log('✅ Email connection test passed');
    
    // Send test email
    const testMailOptions = {
      from: `"Bruv Test" <${process.env.SMTP_USER}>`,
      to: process.env.COMPANY_EMAIL,
      subject: '🧪 Test Email from Bruv Backend',
      text: 'This is a test email to verify the email configuration is working correctly.',
      html: `
        <h2>🧪 Test Email</h2>
        <p>This is a test email to verify the email configuration is working correctly.</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><strong>Environment:</strong> ${process.env.NODE_ENV}</p>
      `
    };
    
    const info = await transporter.sendMail(testMailOptions);
    console.log('✅ Test email sent successfully:', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId,
      message: 'Test email sent successfully'
    };
    
  } catch (error) {
    console.error('❌ Email connection test failed:', error);
    return {
      success: false,
      error: error.message,
      code: error.code
    };
  }
};

module.exports = {
  sendContactEmail,
  testEmailConnection
};