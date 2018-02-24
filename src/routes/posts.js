/*
*** Post Routes ***
*/

// NPM Dependencies
import { Router } from 'express';

// Import Controller
import postController from '../controllers/postController';

import { authJwt } from '../services/passport';

// Create a Express Router instance
const routes = new Router();

routes.post(
  '/',
  authJwt,
  postController.createPost
);
routes.get(
  '/:id',
  postController.getById
);
routes.get(
  '/',
  authJwt,
  postController.getPostList
);

export default routes;
