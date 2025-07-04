// FILE PATH: backend/src/controllers/emailController.js
// Email controller for sending contact form emails using domain email

const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  // Configuration for your domain email
  const config = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // hello@bruv.co.ke
      pass: process.env.SMTP_PASS  // Your email password
    },
    tls: {
      rejectUnauthorized: false // For development - remove in production if not needed
    }
  };

  console.log(`📧 Creating email transporter for: ${config.auth.user}`);
  return nodemailer.createTransport(config);
};

// Email templates
const createEmailTemplates = (data) => {
  const companyTemplate = {
    from: {
      name: 'Bruv Contact Form',
      address: process.env.SMTP_USER
    },
    to: process.env.COMPANY_EMAIL || 'hello@bruv.co.ke',
    subject: `New Contact: ${data.subject}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4; padding: 20px;">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" width="600" style="background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #2D1B69 0%, #1A0F3F 100%); padding: 30px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">New Contact Form Submission</h1>
                    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">From Bruv Website</p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    
                    <!-- Customer Info -->
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                      <h2 style="color: #2D1B69; margin: 0 0 20px 0; font-size: 20px; border-bottom: 2px solid #ef4444; padding-bottom: 10px;">Customer Information</h2>
                      
                      <table cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                            <strong style="color: #2D1B69; display: inline-block; width: 120px;">Name:</strong>
                            <span style="color: #333;">${data.fullName}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                            <strong style="color: #2D1B69; display: inline-block; width: 120px;">Email:</strong>
                            <a href="mailto:${data.email}" style="color: #ef4444; text-decoration: none;">${data.email}</a>
                          </td>
                        </tr>
                        ${data.phone ? `
                        <tr>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                            <strong style="color: #2D1B69; display: inline-block; width: 120px;">Phone:</strong>
                            <a href="tel:${data.phone}" style="color: #ef4444; text-decoration: none;">${data.phone}</a>
                          </td>
                        </tr>
                        ` : ''}
                        ${data.company ? `
                        <tr>
                          <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef;">
                            <strong style="color: #2D1B69; display: inline-block; width: 120px;">Company:</strong>
                            <span style="color: #333;">${data.company}</span>
                          </td>
                        </tr>
                        ` : ''}
                        ${data.serviceInterest ? `
                        <tr>
                          <td style="padding: 8px 0;">
                            <strong style="color: #2D1B69; display: inline-block; width: 120px;">Interest:</strong>
                            <span style="color: #333; background-color: #e7f3ff; padding: 4px 8px; border-radius: 4px; font-size: 14px;">${data.serviceInterest}</span>
                          </td>
                        </tr>
                        ` : ''}
                      </table>
                    </div>

                    <!-- Message -->
                    <div style="margin-bottom: 30px;">
                      <h3 style="color: #2D1B69; margin: 0 0 15px 0; font-size: 18px;">Subject: ${data.subject}</h3>
                      <div style="background-color: #fff; border-left: 4px solid #ef4444; padding: 20px; border-radius: 0 8px 8px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${data.message}</p>
                      </div>
                    </div>

                    <!-- Quick Actions -->
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
                      <h4 style="color: #2D1B69; margin: 0 0 15px 0;">Quick Actions</h4>
                      <a href="mailto:${data.email}?subject=Re: ${data.subject}&body=Hello ${data.firstName},%0D%0A%0D%0AThank you for contacting Bruv.%0D%0A%0D%0A" 
                         style="background-color: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 0 10px; display: inline-block; font-weight: bold;">
                        Reply via Email
                      </a>
                      ${data.phone ? `
                      <a href="tel:${data.phone}" 
                         style="background-color: #2D1B69; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 0 10px; display: inline-block; font-weight: bold;">
                        Call ${data.firstName}
                      </a>
                      ` : ''}
                    </div>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
                    <p style="color: #666; margin: 0; font-size: 14px;">
                      Submitted on ${new Date(data.timestamp).toLocaleString('en-KE', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZone: 'Africa/Nairobi'
                      })} EAT
                    </p>
                    <p style="color: #999; margin: 10px 0 0 0; font-size: 12px;">
                      This email was automatically generated from the Bruv website contact form.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    text: `
New Contact Form Submission from Bruv Website

Customer Information:
- Name: ${data.fullName}
- Email: ${data.email}
- Phone: ${data.phone || 'Not provided'}
- Company: ${data.company || 'Not provided'}
- Service Interest: ${data.serviceInterest || 'Not specified'}

Subject: ${data.subject}

Message:
${data.message}

Submitted: ${new Date(data.timestamp).toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' })} EAT

You can reply directly to this email to respond to ${data.firstName}.
    `
  };

  // Auto-reply template for the customer
  const customerTemplate = {
    from: {
      name: 'Bruv Team',
      address: process.env.SMTP_USER
    },
    to: data.email,
    subject: `Thank you for contacting Bruv - We received your message`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank you for contacting Bruv</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4; padding: 20px;">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" width="600" style="background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #2D1B69 0%, #1A0F3F 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Asante Sana, ${data.firstName}!</h1>
                    <p style="color: rgba(255,255,255,0.9); margin: 15px 0 0 0; font-size: 18px;">We received your message</p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    
                    <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                      Thank you for reaching out to Bruv! We've successfully received your message about "<strong>${data.subject}</strong>" and our team will review it promptly.
                    </p>

                    <!-- What's Next -->
                    <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0;">
                      <h3 style="color: #2D1B69; margin: 0 0 20px 0; font-size: 20px;">What happens next?</h3>
                      <ul style="color: #333; line-height: 1.8; margin: 0; padding-left: 20px;">
                        <li>Our team will review your inquiry within <strong>2-4 business hours</strong></li>
                        <li>You'll receive a personalized response from our experts</li>
                        <li>We'll discuss how Bruv can help with your specific needs</li>
                        <li>If needed, we'll schedule a call to dive deeper into your requirements</li>
                      </ul>
                    </div>

                    <!-- Contact Info -->
                    <div style="background-color: #fff; border: 2px solid #ef4444; padding: 25px; border-radius: 8px; margin: 25px 0;">
                      <h3 style="color: #2D1B69; margin: 0 0 15px 0; font-size: 18px;">Need immediate assistance?</h3>
                      <p style="color: #333; margin: 0 0 15px 0; line-height: 1.6;">
                        For urgent inquiries, feel free to contact us directly:
                      </p>
                      <p style="color: #333; margin: 5px 0; font-size: 16px;">
                        📧 <strong>Email:</strong> <a href="mailto:hello@bruv.co.ke" style="color: #ef4444; text-decoration: none;">hello@bruv.co.ke</a>
                      </p>
                      <p style="color: #333; margin: 5px 0; font-size: 16px;">
                        📞 <strong>Phone:</strong> <a href="tel:+254701234567" style="color: #ef4444; text-decoration: none;">+254 701 234 567</a>
                      </p>
                      <p style="color: #333; margin: 5px 0; font-size: 16px;">
                        🕒 <strong>Hours:</strong> Monday - Friday, 8:00 AM - 6:00 PM EAT
                      </p>
                    </div>

                    <!-- Summary -->
                    <div style="background-color: #e7f3ff; padding: 20px; border-radius: 8px; margin: 25px 0;">
                      <h4 style="color: #2D1B69; margin: 0 0 10px 0;">Your message summary:</h4>
                      <p style="color: #666; margin: 0; font-style: italic;">"${data.subject}"</p>
                    </div>

                    <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 25px 0 0 0;">
                      We're excited to help you achieve <em>precision for your vision</em> with our comprehensive control solutions.
                    </p>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: #2D1B69; padding: 30px; text-align: center;">
                    <h3 style="color: white; margin: 0 0 15px 0; font-size: 20px;">Stay Connected</h3>
                    <p style="color: rgba(255,255,255,0.9); margin: 0 0 20px 0; line-height: 1.6;">
                      Follow our updates and insights on organizational control solutions.
                    </p>
                    <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 14px;">
                      © 2025 Bruv. All rights reserved.<br>
                      Jumuia Place, Kilimani, Nairobi, Kenya
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
    text: `
Hello ${data.firstName},

Asante sana for contacting Bruv! We've successfully received your message about "${data.subject}".

What happens next?
- Our team will review your inquiry within 2-4 business hours
- You'll receive a personalized response from our experts  
- We'll discuss how Bruv can help with your specific needs
- If needed, we'll schedule a call to dive deeper into your requirements

Need immediate assistance?
📧 Email: hello@bruv.co.ke
📞 Phone: +254 701 234 567
🕒 Hours: Monday - Friday, 8:00 AM - 6:00 PM EAT

We're excited to help you achieve precision for your vision with our comprehensive control solutions.

Best regards,
The Bruv Team

© 2025 Bruv. All rights reserved.
Jumuia Place, Kilimani, Nairobi, Kenya
    `
  };

  return { companyTemplate, customerTemplate };
};

// Main function to send contact email
const sendContactEmail = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    // Verify transporter configuration
    console.log('🔍 Verifying email transporter...');
    await transporter.verify();
    console.log('✅ Email transporter verified successfully');

    const { companyTemplate, customerTemplate } = createEmailTemplates(contactData);

    // Send email to company
    console.log(`📤 Sending notification email to ${companyTemplate.to}...`);
    const companyResult = await transporter.sendMail(companyTemplate);
    console.log('✅ Company notification sent:', companyResult.messageId);

    // Send auto-reply to customer
    console.log(`📤 Sending auto-reply to ${customerTemplate.to}...`);
    const customerResult = await transporter.sendMail(customerTemplate);
    console.log('✅ Customer auto-reply sent:', customerResult.messageId);

    return {
      success: true,
      messageId: companyResult.messageId,
      customerMessageId: customerResult.messageId,
      message: 'Emails sent successfully'
    };

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    
    return {
      success: false,
      error: error.message,
      code: error.code,
      details: process.env.NODE_ENV === 'development' ? error : undefined
    };
  }
};

// Test email function
const sendTestEmail = async () => {
  const testData = {
    firstName: 'Test',
    lastName: 'User',
    fullName: 'Test User',
    email: 'test@example.com',
    company: 'Test Company Ltd',
    phone: '+254 700 000 000',
    subject: 'Test Email - Please Ignore',
    message: 'This is a test email to verify that the email service is working correctly. You can safely ignore this message.',
    serviceInterest: 'Project Management Services',
    timestamp: new Date().toISOString()
  };

  return await sendContactEmail(testData);
};

module.exports = {
  sendContactEmail,
  sendTestEmail,
  createTransporter
};