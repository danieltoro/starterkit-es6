/*
*** Application file ***
*/

// NPM Dependencies
import express from 'express';

// Import API Routes file
import apiRoutes from './routes/v1';

// Express instance
const app = express();

// Middlewares
express.json();
express.urlencoded({ extended: true });

// Routes
apiRoutes(app);

export default app;
