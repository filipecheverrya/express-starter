const express = require('express');
const router = express.Router();

const { postValidator } = require('../validators/post.validator');
const { isAuthorized } = require('../middlewares/auth');
const { createPost } = require('../controllers/posts.controller');

/*
  * POST /posts
*/

router.post('/create', postValidator, isAuthorized, createPost);

module.exports = router;
