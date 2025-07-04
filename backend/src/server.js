// FILE PATH: backend/src/server.js
// Complete Production-Ready Server for Bruv Backend API

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import routes
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 10000;

// Trust proxy for accurate IP addresses when behind Render's proxy
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
  contentSecurityPolicy: false // Allow for API usage
}));

// Enhanced CORS configuration for production
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      // Environment variable
      process.env.FRONTEND_URL,
      process.env.CLIENT_URL,
      
      // Development
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:4173',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:3000',
      
      // Production domains
      'https://bruv.africa',
      'https://www.bruv.africa',
      'https://bruv.co.ke',
      'https://www.bruv.co.ke',
      
      // Render URLs (replace with your actual URLs)
      'https://your-frontend-service.onrender.com',
      'https://bruv-frontend.onrender.com',
      
      // Add any other domains you need
    ].filter(Boolean); // Remove any undefined values

    console.log(`🌐 CORS Request from: ${origin}`);
    
    if (allowedOrigins.some(allowed => {
      if (allowed === origin) return true;
      // Allow subdomain matching for onrender.com
      if (allowed.includes('.onrender.com') && origin?.includes('.onrender.com')) {
        return origin.includes('bruv') || origin.includes('your-app-name');
      }
      return false;
    })) {
      console.log(`✅ CORS allowed for: ${origin}`);
      callback(null, true);
    } else {
      console.log(`❌ CORS blocked for: ${origin}`);
      console.log(`📋 Allowed origins: ${allowedOrigins.join(', ')}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'Accept', 
    'Origin', 
    'X-Requested-With',
    'Access-Control-Allow-Origin'
  ],
  exposedHeaders: ['Set-Cookie'],
  optionsSuccessStatus: 200,
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', cors(corsOptions));

// Rate limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
    retryAfter: 15 * 60
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting in development
    return process.env.NODE_ENV === 'development';
  }
});

app.use(globalLimiter);

// Compression and parsing middleware
app.use(compression());
app.use(express.json({ 
  limit: '10mb',
  strict: true,
  type: 'application/json'
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb',
  parameterLimit: 20
}));

// Enhanced logging
const logFormat = process.env.NODE_ENV === 'production' 
  ? 'combined' 
  : 'dev';

app.use(morgan(logFormat, {
  skip: function (req, res) {
    // Skip logging for health checks in production
    return process.env.NODE_ENV === 'production' && req.url === '/health';
  }
}));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url} - IP: ${req.ip} - Origin: ${req.get('Origin') || 'No Origin'}`);
  
  // Log request body for POST requests (excluding sensitive data)
  if (req.method === 'POST' && req.url.includes('/contact')) {
    const logBody = { ...req.body };
    if (logBody.email) logBody.email = logBody.email.replace(/(.{2}).*(@.*)/, '$1***$2');
    if (logBody.phone) logBody.phone = logBody.phone.replace(/(.{3}).*(.{3})/, '$1***$2');
    console.log(`📝 Contact form data:`, logBody);
  }
  
  next();
});

// Environment validation
const requiredEnvVars = ['COMPANY_EMAIL'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.warn(`⚠️  Missing environment variables: ${missingEnvVars.join(', ')}`);
}

// Log environment status
console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`🚀 Starting server on port: ${PORT}`);
console.log(`📧 Company email: ${process.env.COMPANY_EMAIL || 'Not configured'}`);
console.log(`🔧 SMTP configured: ${!!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)}`);

// Health check endpoint with detailed information
app.get('/health', (req, res) => {
  const healthData = {
    status: 'OK',
    message: 'Bruv API is running successfully',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    services: {
      database: 'N/A', // Add database health check if you have one
      email: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
      storage: 'N/A' // Add storage health check if you have one
    },
    config: {
      port: PORT,
      corsEnabled: true,
      rateLimitEnabled: process.env.NODE_ENV !== 'development',
      compressionEnabled: true
    }
  };

  res.status(200).json(healthData);
});

// API routes
app.use('/api/contact', contactRoutes);

// Root endpoint with API documentation
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Bruv API',
    version: '1.0.0',
    status: 'running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    documentation: {
      endpoints: {
        health: {
          method: 'GET',
          path: '/health',
          description: 'Health check endpoint'
        },
        contact: {
          method: 'POST',
          path: '/api/contact',
          description: 'Submit contact form',
          requiredFields: ['firstName', 'lastName', 'email', 'subject', 'message'],
          optionalFields: ['company', 'phone', 'serviceInterest']
        },
        contactTest: {
          method: 'GET',
          path: '/api/contact/test',
          description: 'Test email functionality (development only)'
        }
      },
      rateLimits: {
        global: '100 requests per 15 minutes',
        contact: '5 submissions per 15 minutes'
      },
      cors: {
        enabled: true,
        allowedOrigins: 'Multiple domains allowed',
        credentials: true
      }
    }
  });
});

// API status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    success: true,
    message: 'API is operational',
    timestamp: new Date().toISOString(),
    services: {
      contact: 'operational',
      email: !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) ? 'operational' : 'limited'
    }
  });
});

// Catch-all for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found',
    requestedPath: req.originalUrl,
    method: req.method,
    availableEndpoints: [
      'GET /',
      'GET /health',
      'GET /api/status',
      'POST /api/contact',
      'GET /api/contact/test (development only)'
    ],
    timestamp: new Date().toISOString()
  });
});

// 404 handler for all other routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    requestedPath: req.originalUrl,
    method: req.method,
    suggestion: 'Check the API documentation at the root endpoint (/)',
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((error, req, res, next) => {
  const timestamp = new Date().toISOString();
  const errorId = Math.random().toString(36).substr(2, 9);
  
  console.error(`[${timestamp}] Error ID: ${errorId}`, {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  
  // CORS error handling
  if (error.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      message: 'CORS policy violation',
      error: 'Your domain is not allowed to access this API',
      origin: req.get('Origin'),
      errorId,
      timestamp,
      contact: 'Please contact support if you believe this is an error'
    });
  }

  // Rate limit error handling
  if (error.status === 429) {
    return res.status(429).json({
      success: false,
      message: 'Rate limit exceeded',
      error: 'Too many requests. Please try again later.',
      retryAfter: error.retryAfter || 900, // 15 minutes default
      errorId,
      timestamp
    });
  }

  // Generic error response
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(error.status || 500).json({
    success: false,
    message: isDevelopment ? error.message : 'Internal server error',
    error: isDevelopment ? {
      message: error.message,
      stack: error.stack,
      errorId
    } : 'An unexpected error occurred',
    errorId,
    timestamp,
    ...(isDevelopment && { 
      requestInfo: {
        url: req.url,
        method: req.method,
        headers: req.headers
      }
    })
  });
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('✅ Process terminated');
    process.exit(0);
  });
});

// Unhandled promise rejection handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit the process in production, just log the error
  if (process.env.NODE_ENV === 'development') {
    process.exit(1);
  }
});

// Uncaught exception handling
process.on('uncaughtException', (error) => {
  console.error('🚨 Uncaught Exception:', error);
  // Exit the process for uncaught exceptions
  process.exit(1);
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS enabled for multiple origins`);
  console.log(`🔒 Security headers enabled`);
  console.log(`⚡ Compression enabled`);
  console.log(`📊 Rate limiting: ${process.env.NODE_ENV !== 'development' ? 'enabled' : 'disabled'}`);
  console.log(`📝 Logging: ${logFormat} format`);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('🔐 Running in production mode');
    console.log('📧 Email service status:', !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) ? 'configured' : 'not configured');
  } else {
    console.log('🛠️  Running in development mode');
    console.log(`📡 Local server: http://localhost:${PORT}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
    console.log(`📋 API docs: http://localhost:${PORT}/`);
  }
});

// Set server timeout
server.timeout = 30000; // 30 seconds

module.exports = app;