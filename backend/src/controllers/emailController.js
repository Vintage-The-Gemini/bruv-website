// FILE PATH: backend/src/controllers/emailController.js
// Email handling and sending logic using Nodemailer

const nodemailer = require('nodemailer');

// Create transporter with SMTP configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send contact form email
const sendContactEmail = async (contactData) => {
  try {
    const transporter = createTransporter();

    // Verify SMTP connection
    await transporter.verify();

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
            <p style="margin: 10px 0 0 0; opacity: 0.9;">From: bruv.co.ke</p>
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

            <div class="field">
              <span class="label">📝 Subject:</span>
              <span class="value">${subject}</span>
            </div>
          </div>

          <!-- Message Content -->
          <div class="content">
            <h2 style="color: #2D1B69; margin-bottom: 15px; font-size: 20px;">💬 Message</h2>
            <div class="message-box">
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>

          <!-- Action Required -->
          <div class="urgent">
            <h3 style="margin: 0 0 10px 0; color: #856404;">⚡ Action Required</h3>
            <p style="margin: 0; color: #856404;">
              <strong>Response Time:</strong> Please respond within 24 hours<br>
              <strong>Priority:</strong> New customer inquiry
            </p>
          </div>

          <!-- Technical Information -->
          <div class="content">
            <h3 style="color: #666; font-size: 16px; margin-bottom: 10px;">🔧 Technical Details</h3>
            <div style="font-size: 12px; color: #888; background: #f8f9fa; padding: 15px; border-radius: 5px;">
              <p style="margin: 5px 0;"><strong>Timestamp:</strong> ${new Date(timestamp).toLocaleString()}</p>
              <p style="margin: 5px 0;"><strong>IP Address:</strong> ${ipAddress || 'Unknown'}</p>
              <p style="margin: 5px 0;"><strong>User Agent:</strong> ${userAgent || 'Unknown'}</p>
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p>This email was automatically generated from the contact form on bruv.co.ke</p>
            <p>© 2025 Bruv. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Plain text version
    const textContent = `
New Contact Form Submission from bruv.co.ke

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

Please respond within 24 hours.
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
        'X-Submission-Source': 'bruv.co.ke'
      }
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email sent successfully:', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
};

module.exports = {
  sendContactEmail
};