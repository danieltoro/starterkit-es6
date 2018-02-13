/*
*** User Routes ***
*/

// NPM Dependencies
import { Router } from 'express';

// Import Controller
import UserController from '../controllers/userController';

// Validations
import validations from '../helpers/validations';

// Create a Express Router instance
const routes = new Router();

routes.post(
  '/signup',
  validations.signUp,
  UserController.signUp
);
routes.post(
  '/signin',
  UserController.signIn
);
routes.get(
  '/secret',
  UserController.secret
);

export default routes;
