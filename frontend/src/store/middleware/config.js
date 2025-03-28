const ENV = 'development';

const config = {
  development: {
    MAIN_API_URL: 'http://localhost:8080/', // Java backend
    SUMMARY_API_URL: 'http://localhost:8000/' // Python backend
  },
  production: {
    MAIN_API_URL: 'https://main-api.yourapp.com/api',
    SUMMARY_API_URL: 'https://summary-api.yourapp.com/api'
  }
};

export default config[ENV];