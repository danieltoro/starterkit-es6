/*
*** Post Model ***
*/

// NPM Dependencies
import mongoose, { Schema } from 'mongoose';

// Create the Schema
const postSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title is required!'],
    minlength: [3, 'Title need to be longer!'],
    unique: true,
  },
  text: {
    type: String,
    trim: true,
    required: [true, 'Text is required!'],
    minlength: [10, 'Text need to be longer!'],
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  favoriteCount: {
    type: Number,
    default: 0,
  }
});

// Create the model
const Post = mongoose.model('Post', postSchema);

// Export the model
export default Post;
