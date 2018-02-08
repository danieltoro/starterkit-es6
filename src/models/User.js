/*
*** User Model ***
*/

// NPM Dependencies
import mongoose, { Schema } from 'mongoose';


const userSchema = new Schema({
  method: {
    type: String
  },
  local: {
    email: {},
    password: {}
  }
});

export default mongoose.model('User', userSchema);
