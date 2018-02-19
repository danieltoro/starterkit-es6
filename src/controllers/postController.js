/*
*** Post Controller ***
*/
import Post from '../models/Post';

export async function createPost(req, res) {
  try {
    console.log('req.body: ', req.body);
    const post = await Post.createPost(req.body, req.user._id);
    console.log('req.body: ', req.body);
    console.log('req.user._id: ', req.user._id);
    return res.status(201).json(post);
  } catch (e) {
    return res.status(400).json(e);
  }
}
