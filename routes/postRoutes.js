const express = require("express");
const { createPostController } = require("../controllers/postController");
const { requireSignIn } = require("../controllers/userController");
// route object
const router = express.Router();

// CREATE POST || POST
router.post("/create-post", requireSignIn, createPostController);

// export
module.exports = router;
