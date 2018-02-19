/*
*** API Routes file ***
*/
import userRoutes from './users';
import postRoutes from './posts';

export default app => {
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/posts', postRoutes);
};
