const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

router.get('/:blogId', commentController.getCommentsByBlog);
router.post('/', auth.protect, commentController.createComment);
router.put('/:id', auth.protect, commentController.updateComment);
router.delete('/:id', auth.protect, commentController.deleteComment);

module.exports = router;
