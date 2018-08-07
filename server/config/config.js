require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DEV_URL
  },
  test: {
    url: process.env.TEST_URL
  },
  production: {
    url: process.env.DATABASE_URL
  }
};
