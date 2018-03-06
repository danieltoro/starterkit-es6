/*
*** Database setup ***
*/

// NPM Dependencies
import mongoose from 'mongoose';
import chalk from 'chalk';

import constants from './constants';

// Remove the warning with promise
mongoose.Promise = global.Promise;

// Connect the DATABASE with the url provide
try {
  mongoose.connect(constants.MONGO_URL);
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL);
}

mongoose.connection
  .once('open', () =>
    console.log(
      chalk.green.bold(`
      MongoDB is Running 🍃🍃🍃
      `),
    ),
  )
  .on('error', error =>
    console.log(
      chalk.red(`
      Cannot run database! 😱
      ---
      Error: ${error}
      `),
    ),
  );
