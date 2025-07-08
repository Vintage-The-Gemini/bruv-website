// FILE PATH: backend/src/routes/contact.js
// Complete contact form routes with enhanced error handling, debugging, and domain email support

const express = require("express");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");
const { sendContactEmail } = require("../controllers/emailController");
const {
  validateContactForm,
  sanitizeContactData,
} = require("../middleware/validation");

const router = express.Router();

// Rate limiting for contact form submissions
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message:
      "Too many contact form submissions from this IP. Please try again in 15 minutes.",
    retryAfter: 15 * 60, // seconds
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting in development
    return process.env.NODE_ENV === "development";
  },
});

// POST /api/contact - Handle contact form submission with enhanced error handling
router.post(
  "/",
  contactLimiter,
  validateContactForm,
  sanitizeContactData,
  async (req, res) => {
    try {
      console.log("📋 Contact form submission received");
      console.log("📊 Request body keys:", Object.keys(req.body));
      console.log("🔍 Sanitized data keys:", Object.keys(req.sanitizedData || {}));
      
      const contactData = req.sanitizedData;

      // Validate environment variables
      if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.error("❌ SMTP environment variables not configured");
        console.error("Missing:", {
          SMTP_HOST: !process.env.SMTP_HOST,
          SMTP_USER: !process.env.SMTP_USER,
          SMTP_PASS: !process.env.SMTP_PASS
        });
        return res.status(500).json({
          success: false,
          message: "Email service not configured. Please contact support directly.",
          error: process.env.NODE_ENV === "development" ? "SMTP credentials missing" : undefined,
        });
      }

      if (!process.env.COMPANY_EMAIL) {
        console.error("❌ COMPANY_EMAIL not configured");
        return res.status(500).json({
          success: false,
          message: "Email service not configured. Please contact support directly.",
          error: process.env.NODE_ENV === "development" ? "COMPANY_EMAIL missing" : undefined,
        });
      }

      console.log(`📧 Processing contact form from: ${contactData.email}`);
      console.log(`📝 Subject: ${contactData.subject}`);

      // Send email with detailed error catching
      let emailResult;
      try {
        emailResult = await sendContactEmail(contactData);
        console.log("📬 Email service response:", emailResult);
      } catch (emailError) {
        console.error("❌ Email sending failed:", emailError);
        
        return res.status(500).json({
          success: false,
          message: "Failed to send your message. Please try again or contact us directly.",
          error: process.env.NODE_ENV === "development" ? {
            message: emailError.message,
            stack: emailError.stack,
            type: "EMAIL_SEND_ERROR"
          } : undefined,
        });
      }

      if (emailResult && emailResult.success) {
        console.log(`✅ Email sent successfully to ${process.env.COMPANY_EMAIL}`);
        console.log(`📧 Message ID: ${emailResult.messageId}`);

        res.status(200).json({
          success: true,
          message: "Your message has been sent successfully! We'll get back to you within 24 hours.",
          messageId: emailResult.messageId,
        });
      } else {
        console.error("❌ Email service returned failure:", emailResult);

        res.status(500).json({
          success: false,
          message: "Failed to send your message. Please try again or contact us directly.",
          error: process.env.NODE_ENV === "development" ? {
            emailResult,
            type: "EMAIL_SERVICE_FAILURE"
          } : undefined,
        });
      }
    } catch (error) {
      console.error("❌ Contact form critical error:", error);
      console.error("🔍 Error stack:", error.stack);
      console.error("🔍 Request info:", {
        url: req.url,
        method: req.method,
        headers: req.headers,
        body: req.body
      });

      res.status(500).json({
        success: false,
        message: "An unexpected error occurred. Please try again later or contact us directly.",
        error: process.env.NODE_ENV === "development" ? {
          message: error.message,
          stack: error.stack,
          type: "CRITICAL_ERROR"
        } : undefined,
      });
    }
  }
);

// GET /api/contact/test - Test endpoint for email functionality
router.get("/test", async (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(404).json({
      success: false,
      message: "Test endpoint not available in production",
    });
  }

  try {
    const testData = {
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      company: "Test Company",
      phone: "+254 700 000 000",
      subject: "Test Email from API",
      message: "This is a test message to verify email functionality.",
      serviceInterest: "Project Management Services",
      fullName: "Test User",
      timestamp: new Date().toISOString(),
      userAgent: "Test Agent",
      ipAddress: "127.0.0.1"
    };

    console.log("🧪 Running email test with data:", testData);

    const result = await sendContactEmail(testData);

    res.json({
      success: result.success,
      message: result.success
        ? "Test email sent successfully!"
        : "Test email failed",
      details: result,
      testData: testData
    });
  } catch (error) {
    console.error("❌ Test email error:", error);
    res.status(500).json({
      success: false,
      message: "Test email failed",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined
    });
  }
});

// GET /api/contact/status - Check email service status
router.get("/status", (req, res) => {
  const emailConfig = {
    configured: !!(
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ),
    host: process.env.SMTP_HOST || "Not configured",
    port: process.env.SMTP_PORT || "Not configured",
    user: process.env.SMTP_USER || "Not configured",
    companyEmail: process.env.COMPANY_EMAIL || "Not configured",
    secure: process.env.SMTP_SECURE || "Not configured"
  };

  res.json({
    success: true,
    message: "Email service status",
    emailService: emailConfig,
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
    allConfigured: emailConfig.configured && !!process.env.COMPANY_EMAIL
  });
});

// GET /api/contact/debug - Debug production environment (remove in production)
router.get("/debug", (req, res) => {
  res.json({
    success: true,
    message: "Production environment debug info",
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      SMTP_HOST: process.env.SMTP_HOST ? "SET" : "NOT SET",
      SMTP_USER: process.env.SMTP_USER ? "SET" : "NOT SET", 
      SMTP_PASS: process.env.SMTP_PASS ? "SET" : "NOT SET",
      SMTP_PORT: process.env.SMTP_PORT || "NOT SET",
      SMTP_SECURE: process.env.SMTP_SECURE || "NOT SET",
      COMPANY_EMAIL: process.env.COMPANY_EMAIL ? "SET" : "NOT SET"
    },
    timestamp: new Date().toISOString()
  });
});

// POST /api/contact/simple-test - Simple test route that doesn't send email
router.post("/simple-test", (req, res) => {
  try {
    console.log("📝 Simple test route hit");
    console.log("📋 Request body:", req.body);
    
    res.json({
      success: true,
      message: "Simple test successful - no email sent",
      receivedData: req.body,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV
    });
  } catch (error) {
    console.error("❌ Simple test failed:", error);
    res.status(500).json({
      success: false,
      message: "Simple test failed",
      error: error.message
    });
  }
});

// GET /api/contact/smtp-test - Test SMTP configuration with multiple ports
router.get("/smtp-test", async (req, res) => {
  try {
    console.log('🧪 Testing SMTP configuration...');
    
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.status(400).json({
        success: false,
        message: 'SMTP environment variables not configured',
        missing: {
          SMTP_HOST: !process.env.SMTP_HOST,
          SMTP_USER: !process.env.SMTP_USER,
          SMTP_PASS: !process.env.SMTP_PASS
        }
      });
    }
    
    // Test multiple port configurations
    const testConfigs = [
      { port: 587, secure: false, name: 'TLS (587)' },
      { port: 465, secure: true, name: 'SSL (465)' },
      { port: 25, secure: false, name: 'Plain (25)' },
      { port: 2525, secure: false, name: 'Alt TLS (2525)' }
    ];
    
    const results = [];
    
    for (const config of testConfigs) {
      try {
        console.log(`Testing ${config.name}...`);
        
        const testTransporter = nodemailer.createTransporter({
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
          connectionTimeout: 10000,
          greetingTimeout: 5000,
          socketTimeout: 10000
        });
        
        await testTransporter.verify();
        results.push({
          config: config.name,
          status: 'SUCCESS ✅',
          port: config.port,
          secure: config.secure,
          recommended: config.port === 587 || config.port === 465
        });
        console.log(`✅ ${config.name} connection successful`);
        
      } catch (error) {
        results.push({
          config: config.name,
          status: 'FAILED ❌',
          port: config.port,
          secure: config.secure,
          error: error.message,
          code: error.code
        });
        console.log(`❌ ${config.name} connection failed:`, error.message);
      }
    }
    
    const successfulConfig = results.find(r => r.status.includes('SUCCESS'));
    
    res.json({
      success: true,
      message: 'SMTP configuration test completed',
      environment: {
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_USER: process.env.SMTP_USER ? 'SET' : 'NOT SET',
        SMTP_PASS: process.env.SMTP_PASS ? 'SET' : 'NOT SET',
        COMPANY_EMAIL: process.env.COMPANY_EMAIL
      },
      testResults: results,
      recommendation: successfulConfig ? 
        `Use port ${successfulConfig.port} with secure=${successfulConfig.secure}` : 
        'No successful configuration found - check your SMTP credentials',
      nextSteps: successfulConfig ? 
        'Update your environment variables with the successful configuration' :
        'Verify your SMTP host, username, and password with your email provider'
    });
    
  } catch (error) {
    console.error('❌ SMTP test error:', error);
    res.status(500).json({
      success: false,
      message: 'SMTP test failed',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// GET /api/contact/send-test - Send actual test email using current config
router.get("/send-test", async (req, res) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(403).json({
      success: false,
      message: "Send test endpoint disabled in production for security",
    });
  }

  try {
    console.log('📧 Sending actual test email...');
    
    const testData = {
      firstName: "SMTP",
      lastName: "Test",
      email: "test@example.com",
      company: "Test Company",
      phone: "+1234567890",
      subject: "🧪 SMTP Configuration Test",
      message: `This is a test email to verify your SMTP configuration is working correctly.

Timestamp: ${new Date().toISOString()}
Environment: ${process.env.NODE_ENV}
SMTP Host: ${process.env.SMTP_HOST}
SMTP Port: ${process.env.SMTP_PORT || 'default'}

If you receive this email, your SMTP configuration is working! 🎉`,
      serviceInterest: "Testing",
      fullName: "SMTP Test",
      timestamp: new Date().toISOString(),
      userAgent: "SMTP Test Agent",
      ipAddress: "127.0.0.1"
    };

    const result = await sendContactEmail(testData);

    res.json({
      success: result.success,
      message: result.success ? 
        `Test email sent successfully to ${process.env.COMPANY_EMAIL}! Check your inbox.` :
        "Test email failed to send",
      details: result,
      sentTo: process.env.COMPANY_EMAIL
    });

  } catch (error) {
    console.error('❌ Send test error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send test email',
      error: error.message
    });
  }
});

module.exports = router;