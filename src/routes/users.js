/*
*** User Routes ***
*/

// NPM Dependencies
import { Router } from 'express';
import passport from 'passport';

// Import Controller
import UserController from '../controllers/userController';

// Validations
import { validateBody, schemas } from '../helpers/validations';

import passportConfig from '../services/passport';

// Create a Express Router instance
const routes = new Router();

routes.post(
  '/signup',
  validateBody(schemas.authSchemas),
  UserController.signUp
);
routes.post(
  '/signin',
  UserController.signIn
);
routes.get(
  '/secret',
  passport.authenticate('jwt', { session: false }),
  UserController.secret
);

export default routes;
