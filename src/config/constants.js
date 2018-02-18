/*
*** Constants file setup ***
*/

// NPM Dependencies
import dotenv from 'dotenv';

// Dotenv instance
dotenv.config();

const devConfig = {
  MONGO_URL: process.env.MONGO_URL_DEV,
  JWT_SECRET: process.env.JWT_SECRET_DEV,
  oauth: {
    google: {
      clientID: ' 1068368765143-cdl89bi0u9l6bbv574n3np1orppqc5ab.apps.googleusercontent.com',
      clientSecret: 'Zkaeoo9dBx-Z505BIZX7tQMQ'
    },
    facebook: {
      clientID: '147675959232441',
      clientSecret: 'f20c3de3c8994c31fdd7d8d7eb3552a1'
    }
  }
};

const testConfig = {
  MONGO_URL: process.env.MONGO_URL_TEST,
  JWT_SECRET: process.env.JWT_SECRET_TEST,
  oauth: {
    google: {
      clientID: '',
      clientSecret: ''
    },
    facebook: {

    }
  }
};

const prodConfig = {
  MONGO_URL: process.env.MONGO_URL_PROD,
  JWT_SECRET: process.env.JWT_SECRET_PROD,
  oauth: {
    google: {
      clientID: '',
      clientSecret: ''
    },
    facebook: {

    }
  }
};

const defaultConfig = {
  PORT: process.env.PORT || 3000,
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV),
};
