/*
*** User Controller ***
*/

// NPM Dependencies
import JWT from 'jsonwebtoken';

// Import User Model
import User from '../models/User';

// Import Config file
import constants from '../config/constants';

export function signToken(user) {
  return JWT.sign(
    {
      iss: 'Starterkit',
      sub: user.id,
      iat: new Date().getTime(), // Current time
      exp: new Date().setDate(new Date().getDate() + 1), // Current time + day ahead
    },
    constants.JWT_SECRET,
  );
}

export default {
  signUp: async (req, res) => {
    const { email, password } = req.value.body;
    // Check if there is a user with the same email
    const foundUser = await User.findOne({ 'local.email': email });
    if (foundUser) {
      return res.status(403).send({ error: 'Email is already taken' });
    }
    // Create a new User
    const newUser = new User({
      method: 'local',
      local: {
        email,
        password,
      },
    });
    await newUser.save();
    // Create the token
    const token = signToken(newUser);
    // Respond with token
    return res.status(200).json({ token });
  },
  signIn: async (req, res) => {
    // Generate Token
    const token = signToken(req.user);
    // Respond with token
    res.status(200).json({ token });
  },
  googleOAuth: async (req, res) => {
    // Generate Token
    const token = signToken(req.user);
    // Respond with token
    res.status(200).json({ token });
  },
  facebookOAuth: async (req, res) => {
    // Generate Token
    const token = signToken(req.user);
    // Respond with token
    res.status(200).json({ token });
  },
};
