/*
*** Post Controller ***
*/
import Post from '../models/Post';

export default {
  createPost: async (req, res) => {
    try {
      const post = await Post.createPost(req.body, req.user._id);
      console.log(post);
      return res.status(201).json(post);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  getPostById: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).populate('user');
      return res.status(200).json(post);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  getPostList: async (req, res) => {
    const limit = parseInt(req.query.limit, 0);
    const skip = parseInt(req.query.skip, 0);
    try {
      const posts = await Post.list({ limit, skip });
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  updatePost: async (req, res) => {
    console.log('update posts');
    try {
      const post = await Post.findById(req.params.id);
      if (!post.user.equals(req.user._id)) {
        return res.sendStatus(401);
      }
      Object.keys(req.body).forEach(key => {
        post[key] = req.body[key];
      });
      return res.status(200).json(await post.save());
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  deletePost: async (req, res) => {
  },
};
