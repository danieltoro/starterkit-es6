/*
*** Post Routes ***
*/

// NPM Dependencies
import { Router } from 'express';
import validate from 'express-validation';

// Import Controller
import postController from '../controllers/postController';

// Import JWT Strategy
import { authJwt } from '../services/passport';

// Import Validation file
import postValidation from '../helpers/post.validations';

// Create a Express Router instance
const routes = new Router();

routes.post(
  '/',
  authJwt,
  validate(postValidation.createPost),
  postController.createPost
);
routes.get(
  '/:id',
  postController.getPostById
);
routes.get(
  '/',
  authJwt,
  postController.getPostList
);
routes.patch(
  '/:id',
  authJwt,
  validate(postValidation.updatePost),
  postController.updatePost
);

export default routes;
