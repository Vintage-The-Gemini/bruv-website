// FILE PATH: backend/src/routes/contact.js
// Contact form routes and email sending logic

const express = require("express");
const rateLimit = require("express-rate-limit");
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

// POST /api/contact - Handle contact form submission
router.post(
  "/",
  contactLimiter,
  validateContactForm,
  sanitizeContactData,
  async (req, res) => {
    try {
      const contactData = req.sanitizedData;

      console.log(`📧 New contact form submission from: ${contactData.email}`);

      // Send email
      const emailResult = await sendContactEmail(contactData);

      if (emailResult.success) {
        console.log(
          `✅ Email sent successfully to ${process.env.COMPANY_EMAIL}`
        );

        res.status(200).json({
          success: true,
          message:
            "Your message has been sent successfully! We'll get back to you within 24 hours.",
          messageId: emailResult.messageId,
        });
      } else {
        console.error("❌ Failed to send email:", emailResult.error);

        res.status(500).json({
          success: false,
          message:
            "Failed to send your message. Please try again or contact us directly at support@bruv.africa",
          error:
            process.env.NODE_ENV === "development"
              ? emailResult.error
              : undefined,
        });
      }
    } catch (error) {
      console.error("❌ Contact form error:", error);

      res.status(500).json({
        success: false,
        message:
          "An unexpected error occurred. Please try again later or contact us directly.",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
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
    };

    const result = await sendContactEmail(testData);

    res.json({
      success: result.success,
      message: result.success
        ? "Test email sent successfully!"
        : "Test email failed",
      details: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Test email failed",
      error: error.message,
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
    user: process.env.SMTP_USER || "Not configured",
    companyEmail: process.env.COMPANY_EMAIL || "Not configured",
  };

  res.json({
    success: true,
    message: "Email service status",
    emailService: emailConfig,
    environment: process.env.NODE_ENV || "development",
  });
});

module.exports = router;
