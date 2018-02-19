/*
*** Post Routes ***
*/

// NPM Dependencies
import { Router } from 'express';

// Import Controller
import * as postController from '../controllers/postController';

import { authJwt } from '../services/passport';

// Create a Express Router instance
const routes = new Router();

routes.post(
  '/',
  authJwt,
  postController.createPost
);

export default routes;
