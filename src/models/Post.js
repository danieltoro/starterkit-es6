/*
*** Post Model ***
*/

// NPM Dependencies
import mongoose, { Schema } from 'mongoose';

// Create the Schema
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required!'],
      minlength: [3, 'Title need to be longer!'],
    },
    text: {
      type: String,
      trim: true,
      required: [true, 'Text is required!'],
      minlength: [10, 'Text need to be longer!'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    favoriteCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

postSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      text: this.text,
      createdAt: this.createdAt,
      user: this.user,
      favoriteCount: this.favoriteCount,
    };
  },
};

postSchema.statics = {
  createPost(args, user) {
    return this.create({
      ...args,
      user,
    });
  },
  list({ skip = 0, limit = 5 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user');
  },
};

// Create the model
const Post = mongoose.model('Post', postSchema);

// Export the model
export default Post;
