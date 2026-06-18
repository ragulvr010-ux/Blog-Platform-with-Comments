const Comment = require('../models/Comment');

exports.getCommentsByBlog = async (req, res, next) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId }).populate('author', 'name avatar').sort({ createdAt: 1 });
    res.json(comments);
  } catch (err) { next(err); }
};

exports.createComment = async (req, res, next) => {
  try {
    const { blog, content, parent } = req.body;
    const comment = await Comment.create({ blog, content, parent: parent || null, author: req.user._id });
    res.status(201).json(comment);
  } catch (err) { next(err); }
};

exports.updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Not found' });
    if (comment.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    comment.content = req.body.content || comment.content;
    await comment.save();
    res.json(comment);
  } catch (err) { next(err); }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Not found' });
    if (comment.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    await comment.remove();
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
