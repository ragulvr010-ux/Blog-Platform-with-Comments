const User = require('../models/User');
const Blog = require('../models/Blog');
const Comment = require('../models/Comment');

exports.getStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBlogs = await Blog.countDocuments();
    const totalComments = await Comment.countDocuments();
    const popular = await Blog.find().sort({ views: -1 }).limit(5).select('title views');
    res.json({ totalUsers, totalBlogs, totalComments, popular });
  } catch (err) { next(err); }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) { next(err); }
};
