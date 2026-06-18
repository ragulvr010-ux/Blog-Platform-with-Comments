const Category = require('../models/Category');

exports.getCategories = async (req, res, next) => {
  try {
    const cats = await Category.find().sort({ name: 1 });
    res.json(cats);
  } catch (err) { next(err); }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    const cat = await Category.create({ name, description, slug });
    res.status(201).json(cat);
  } catch (err) { next(err); }
};
