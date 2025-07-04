// FILE PATH: backend/src/middleware/validation.js
// Validation and sanitization middleware for contact form

const validator = require('validator');

// Validate contact form data
const validateContactForm = (req, res, next) => {
  const { firstName, lastName, email, subject, message, phone, company, serviceInterest } = req.body;
  const errors = [];

  // Required field validation
  if (!firstName || firstName.trim().length < 2) {
    errors.push('First name must be at least 2 characters long');
  }

  if (!lastName || lastName.trim().length < 2) {
    errors.push('Last name must be at least 2 characters long');
  }

  if (!email || !validator.isEmail(email)) {
    errors.push('Valid email address is required');
  }

  if (!subject || subject.trim().length < 5) {
    errors.push('Subject must be at least 5 characters long');
  }

  if (!message || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  // Optional field validation
  if (phone && !validator.isMobilePhone(phone, 'any', { strictMode: false })) {
    errors.push('Please provide a valid phone number');
  }

  // Length limits
  if (firstName && firstName.length > 50) {
    errors.push('First name must be less than 50 characters');
  }

  if (lastName && lastName.length > 50) {
    errors.push('Last name must be less than 50 characters');
  }

  if (subject && subject.length > 200) {
    errors.push('Subject must be less than 200 characters');
  }

  if (message && message.length > 2000) {
    errors.push('Message must be less than 2000 characters');
  }

  if (company && company.length > 100) {
    errors.push('Company name must be less than 100 characters');
  }

  // Valid service interest options
  const validServices = [
    'Project Management Services',
    'Information Systems Audit',
    'Quality Assurance Services', 
    'Risk & Compliance Advisory',
    'Project Management Software',
    'Internal Audit Management Software',
    'Risk & Compliance Management Software',
    'Other',
    '' // Allow empty
  ];

  if (serviceInterest && !validServices.includes(serviceInterest)) {
    errors.push('Invalid service interest selected');
  }

  // Check for suspicious content (basic spam protection)
  const suspiciousPatterns = [
    /\b(viagra|cialis|casino|lottery|bitcoin|crypto)\b/i,
    /\b(click here|urgent|winner|congratulations)\b/i,
    /<script[^>]*>.*?<\/script>/gi,
    /<iframe[^>]*>.*?<\/iframe>/gi
  ];

  const fullText = `${firstName} ${lastName} ${email} ${subject} ${message} ${company}`.toLowerCase();
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(fullText)) {
      errors.push('Message contains suspicious content');
      break;
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};

// Sanitize contact form data
const sanitizeContactData = (req, res, next) => {
  const data = req.body;

  try {
    // Sanitize and prepare data
    const sanitizedData = {
      firstName: validator.escape(data.firstName?.trim() || ''),
      lastName: validator.escape(data.lastName?.trim() || ''),
      email: validator.normalizeEmail(data.email?.trim() || ''),
      company: validator.escape(data.company?.trim() || ''),
      phone: validator.escape(data.phone?.trim() || ''),
      subject: validator.escape(data.subject?.trim() || ''),
      message: data.message?.trim() || '', // Don't escape message to preserve formatting
      serviceInterest: validator.escape(data.serviceInterest?.trim() || ''),
      fullName: `${data.firstName?.trim() || ''} ${data.lastName?.trim() || ''}`.trim(),
      timestamp: new Date().toISOString(),
      userAgent: req.get('User-Agent') || '',
      ipAddress: req.ip || req.connection.remoteAddress || 'unknown'
    };

    // Additional cleaning for message (remove HTML but preserve line breaks)
    sanitizedData.message = sanitizedData.message
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
      .replace(/<[^>]*>/g, '') // Remove all HTML tags
      .trim();

    req.sanitizedData = sanitizedData;
    next();
  } catch (error) {
    console.error('Sanitization error:', error);
    return res.status(500).json({
      success: false,
      message: 'Data processing error',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal error'
    });
  }
};

// Validate email configuration
const validateEmailConfig = () => {
  const requiredEnvVars = [
    'SMTP_HOST',
    'SMTP_USER', 
    'SMTP_PASS',
    'COMPANY_EMAIL'
  ];

  const missing = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.error('❌ Missing email configuration:', missing);
    return {
      valid: false,
      missing: missing,
      message: `Missing required environment variables: ${missing.join(', ')}`
    };
  }

  // Validate email format
  if (!validator.isEmail(process.env.SMTP_USER)) {
    return {
      valid: false,
      message: 'SMTP_USER must be a valid email address'
    };
  }

  if (!validator.isEmail(process.env.COMPANY_EMAIL)) {
    return {
      valid: false,
      message: 'COMPANY_EMAIL must be a valid email address'
    };
  }

  console.log('✅ Email configuration validated');
  return {
    valid: true,
    message: 'Email configuration is valid'
  };
};

module.exports = {
  validateContactForm,
  sanitizeContactData,
  validateEmailConfig
};