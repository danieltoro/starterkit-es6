/*
*** Post Controller ***
*/
import Post from '../models/Post';

export default {
  createPost: async (req, res) => {
    try {
      const post = await Post.createPost(req.body, req.user._id);
      return res.status(201).json(post);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  getById: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('user');
      return res.status(200).json(post);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  getPostList: async (req, res) => {
    try {
      const posts = await Post.find().populate('user');
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
};
