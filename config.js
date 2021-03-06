'use strict';

require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  DATABASE_URL:
        process.env.LEAD_DATABASE_URL || 'mongodb://mbw2:thisisapassword2@ds161529.mlab.com:61529/lead-lifecycle-design',
  TEST_DATABASE_URL:
        process.env.TEST_LEAD_DATABASE_URL ||
        'mongodb://localhost/thinkful-backend-test',
  PRODUCTION_DATABASE_URL:
        process.env.PRODUCTION_LEAD_DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d'
};
