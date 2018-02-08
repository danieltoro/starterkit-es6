/*
*** User Routes ***
*/

// NPM Dependencies
import { Router } from 'express';

// Import Controller
import UsersCtrl from '../controllers/userController';

// Validations
import { validateBody, schemas } from '../helpers/validations';

// Create a Express Router instance
const routes = new Router();

routes.post(
  '/signup',
  validateBody(schemas.authSchema),
  UsersCtrl.signUp
);
routes.post(
  '/signin',
  UsersCtrl.signIn
);
routes.get(
  '/secret',
  UsersCtrl.secret
);

export default routes;
