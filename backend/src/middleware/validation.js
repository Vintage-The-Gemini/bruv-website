// FILE PATH: backend/src/middleware/validation.js
// Request validation and sanitization middleware

const validator = require('validator');

// Validate contact form data
const validateContactForm = (req, res, next) => {
  const { firstName, lastName, email, subject, message } = req.body;
  const errors = [];

  // Required field validation
  if (!firstName || firstName.trim().length === 0) {
    errors.push('First name is required');
  }
  if (!lastName || lastName.trim().length === 0) {
    errors.push('Last name is required');
  }
  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  }
  if (!subject || subject.trim().length === 0) {
    errors.push('Subject is required');
  }
  if (!message || message.trim().length === 0) {
    errors.push('Message is required');
  }

  // Field length validation
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

  // Email validation
  if (email && !validator.isEmail(email)) {
    errors.push('Please provide a valid email address');
  }

  // Phone validation (if provided)
  if (req.body.phone && req.body.phone.trim() !== '') {
    const phone = req.body.phone.replace(/\s+/g, '');
    if (!validator.isMobilePhone(phone, 'any')) {
      errors.push('Please provide a valid phone number');
    }
  }

  // Content validation - check for suspicious patterns
  const suspiciousPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /<iframe[^>]*>.*?<\/iframe>/gi
  ];

  const fullText = `${firstName} ${lastName} ${email} ${subject} ${message} ${req.body.company || ''}`.toLowerCase();
  
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
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = {
  validateContactForm,
  sanitizeContactData
};