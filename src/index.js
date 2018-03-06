/*
*** Server setup ***
*/

// NPM Dependencies
import chalk from 'chalk';

// Import constant Config file
import constants from './config/constants';

// Importing Database config file
import './config/database';

// Import App file
import app from './app';

// Starting the Server
app.listen(constants.PORT, err => {
  if (err) {
    console.log(
      chalk.red(`
      Cannot run! 😱
      ---
      Error: ${err}
      `),
    );
  } else {
    console.log(
      chalk.yellow.bold(`
      Yep, it's working! 🍺
      ---
      Server running on port: ${constants.PORT}
      ---
      Env: ${process.env.NODE_ENV}
      `),
    );
  }
});
