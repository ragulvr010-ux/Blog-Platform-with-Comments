const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlog);
router.post('/', auth.protect, upload.single('featuredImage'), blogController.createBlog);
router.put('/:id', auth.protect, upload.single('featuredImage'), blogController.updateBlog);
router.delete('/:id', auth.protect, blogController.deleteBlog);
router.post('/:id/like', auth.protect, blogController.toggleLike);

module.exports = router;
