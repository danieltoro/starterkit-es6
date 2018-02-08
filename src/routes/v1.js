/*
*** API Routes file ***
*/
import users from './users';

export default app => {
  app.use('/api/v1/users', users);
};
