/*
*** User Model ***
*/

// NPM Dependencies
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Create a Schema
const userSchema = new Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    required: true
  },
  local: {
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String
    }
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  try {
    if (this.method !== 'local') {
      next();
    }
    // Generate Salt
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.local.password, salt);
    // Re-assign hashed password, over original plain text password
    this.local.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    console.log('this.local.password: ', this.local.password);
    console.log('new password: ', newPassword);
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
};
userSchema.methods = {
  toJSON() {
    return {
      _id: this._id,
      email: this.email,
    };
  }
};

// Create a Model
const User = mongoose.model('User', userSchema);

// Export the Model
export default User;
