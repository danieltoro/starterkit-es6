/*
*** User Routes ***
*/

// NPM Dependencies
import { Router } from 'express';

// Import Controller
import UserController from '../controllers/userController';

// Validations
import { validateBody, schemas } from '../helpers/validations';

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
  UserController.secret
);

export default routes;
