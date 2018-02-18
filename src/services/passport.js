// NPM Dependencies
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';
import GooglePlusTokenStrategy from 'passport-google-plus-token';
import FacebookTokenStrategy from 'passport-facebook-token';


import constants from '../config/constants';

// Import User Model
import User from '../models/User';

// Json Web Token Strategy
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: constants.JWT_SECRET
};

const jwtStrategy = new JwtStrategy(jwtOpts, async (payload, done) => {
  try {
    // Find the user specified in token
    const user = await User.findById(payload.sub);

    // If user doesn't exists, handle it
    if (!user) {
      return done(null, false);
    }

    // Otherwise, return the user
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

// Local Strategy
const localOpts = { usernameField: 'email' };

const localStrategy = new LocalStrategy(localOpts, async (email, password, done) => {
  try {
    // Find the user given the email
    const user = await User.findOne({ "local.email": email });

    // If not, handle it
    if (!user) {
      return done(null, false);
    }

    // Check if the password is correct
    const isMatch = await user.isValidPassword(password);

    // If not, handle it
    if (!isMatch) {
      return done(null, false);
    }

    // Otherwise, return the user
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

// Google OAuth Strategy
const googleOpts = {
  clientID: constants.oauth.google.clientID,
  clientSecret: constants.oauth.google.clientSecret
};

const googleStrategy = new GooglePlusTokenStrategy(googleOpts, async (accessToken, refreshToken, profile, done) => {
  try {
    // Should have full user profile over here
    console.log('profile: ', profile);
    console.log('accessToken: ', accessToken);
    console.log('refreshToken: ', refreshToken);
    // Check whether this current user exist in our DB
    const existingUser = await User.findOne({ 'google.id': profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }
    // If new account
    const newUser = new User({
      method: 'google',
      google: {
        id: profile.id,
        email: profile.emails[0].value
      }
    });

    await newUser.save();
    done(null, newUser);
  } catch (error) {
    done(error, false, error.message);
  }
});

// Facebook OAuth Strategy
const facebookOpt = {
  clientID: constants.oauth.facebook.clientID,
  clientSecret: constants.oauth.facebook.clientSecret
};

const facebookStrategy = new FacebookTokenStrategy(facebookOpt, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

    const existingUser = await User.findOne({ 'facebook.id': profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = new User({
      method: 'facebook',
      facebook: {
        id: profile.id,
        email: profile.emails[0].value
      }
    });

    await newUser.save();
    done(null, newUser);
  } catch (error) {
    done(error, false, error.message);
  }
});


passport.use(jwtStrategy);
passport.use(localStrategy);
passport.use('googleToken', googleStrategy);
passport.use('facebookToken', facebookStrategy);

export const authJwt = passport.authenticate('jwt', { session: false });
export const authLocal = passport.authenticate('local', { session: false });
export const authGoogle = passport.authenticate('googleToken', { session: false });
export const authFacebook = passport.authenticate('facebookToken', { session: false });
