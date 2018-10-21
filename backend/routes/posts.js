const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const fileMulter = require('../middleware/file-multer');

const PostsController = require('../controllers/posts');

router.post("", checkAuth, fileMulter, PostsController.createPosts);

router.get("", PostsController.fetchPosts);

router.get("/:id", PostsController.fetchPost);

router.delete("/:id", checkAuth, PostsController.deletePost);


router.put("/:id", checkAuth, fileMulter, PostsController.updatePost);
module.exports = router;
