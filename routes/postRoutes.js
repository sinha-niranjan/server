const express = require("express");
const {
  createPostController,
  getAllPostsController,
  getUserPostsController,
  deletePostController,
  updatePostController,
} = require("../controllers/postController");
const { requireSignIn } = require("../controllers/userController");
// route object
const router = express.Router();

// CREATE POST || POST
router.post("/create-post", requireSignIn, createPostController);

// Get ALL POSTS
router.get("/get-all-posts", getAllPostsController);

// Get USER POSTS
router.get("/get-user-posts", requireSignIn, getUserPostsController);

// Delete Post
router.delete("/delete-post/:id", requireSignIn, deletePostController);

// Update Post
router.put("/update-post/:id", requireSignIn, updatePostController);

// export
module.exports = router;
