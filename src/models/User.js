/*
*** User Model ***
*/

// NPM Dependencies
import mongoose, { Schema } from 'mongoose';

// Create a Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create a Model
const User = mongoose.model('User', userSchema);

// Export the Model
export default User;
