/*
*** User Routes ***
*/

// NPM Dependencies
import { Router } from 'express';

// Import Controller
import UserController from '../controllers/userController';

// Validations
import { validateBody, schemas } from '../helpers/validations';

import { authJwt, authLocal, authGoogle, authFacebook } from '../services/passport';

// Create a Express Router instance
const routes = new Router();

routes.post(
  '/signup',
  validateBody(schemas.authSchema),
  UserController.signUp
);
routes.post(
  '/signin',
  validateBody(schemas.authSchema),
  authLocal,
  UserController.signIn
);
routes.post(
  '/oauth/google',
  authGoogle,
  UserController.googleOAuth
);
routes.post(
  '/oauth/facebook',
  authFacebook,
  UserController.facebookOAuth
);
routes.get(
  '/secret',
  authJwt,
  UserController.secret
);

export default routes;
