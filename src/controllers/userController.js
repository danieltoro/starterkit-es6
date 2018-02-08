/*
*** User Controller ***
*/
// import User from '../models/User';

export default {
  signUp: async (req, res, next) => {
    // Email and Password
    console.log('UsersCtrl.signUp() Called!');
  },
  signIn: async (req, res, next) => {
    // Generate Token
    console.log('UsersCtrl.signIn() Called!');
  },
  secret: async (req, res, next) => {
    console.log('UsersCtrl.secret() Called!');
  },
};
