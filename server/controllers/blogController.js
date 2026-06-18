const Blog = require('../models/Blog');
const sanitizeHtml = require('sanitize-html');

exports.createBlog = async (req, res, next) => {
  try {
    const { title, content, category, tags } = req.body;
    const sanitized = sanitizeHtml(content || '', { allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]) });
    const blog = await Blog.create({ title, content: sanitized, category, tags: tags ? tags.split(',').map(t=>t.trim()) : [], author: req.user._id, featuredImage: req.file ? `/uploads/${req.file.filename}` : undefined });
    res.status(201).json(blog);
  } catch (err) { next(err); }
};

exports.getBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, category, tag, author } = req.query;
    const q = {};
    if (search) q.$or = [ { title: new RegExp(search, 'i') }, { content: new RegExp(search, 'i') } ];
    if (category) q.category = category;
    if (tag) q.tags = tag;
    if (author) q.author = author;
    const skip = (page - 1) * limit;
    const blogs = await Blog.find(q).populate('author', 'name avatar').populate('category', 'name slug').sort({ createdAt: -1 }).skip(Number(skip)).limit(Number(limit));
    const total = await Blog.countDocuments(q);
    res.json({ data: blogs, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) { next(err); }
};

exports.getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name avatar').populate('category', 'name');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    blog.views = (blog.views || 0) + 1;
    await blog.save();
    res.json(blog);
  } catch (err) { next(err); }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Not found' });
    if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    const updates = req.body;
    if (updates.content) updates.content = sanitizeHtml(updates.content);
    if (req.file) updates.featuredImage = `/uploads/${req.file.filename}`;
    const updated = await Blog.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updated);
  } catch (err) { next(err); }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Not found' });
    if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    await blog.remove();
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};

exports.toggleLike = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Not found' });
    const idx = blog.likes.findIndex(id => id.toString() === req.user._id.toString());
    if (idx === -1) blog.likes.push(req.user._id); else blog.likes.splice(idx,1);
    await blog.save();
    res.json({ likesCount: blog.likes.length });
  } catch (err) { next(err); }
};
