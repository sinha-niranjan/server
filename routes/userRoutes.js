const express = require("express");
const {
  registerController,
  loginController,
  updateUser,
  requireSignIn,
} = require("../controllers/userController");

// Router object
const router = express.Router();

// routes
// REGISTER || POST

router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

// UPDATE || PUT
router.put("/update-user", requireSignIn, updateUser);

// export
module.exports = router;
