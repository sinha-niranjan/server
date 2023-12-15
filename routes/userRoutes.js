const express = require("express");
const {
  registerController,
  loginController,
  updateUser,
} = require("../controllers/userController");

// Router object
const router = express.Router();

// routes
// REGISTER || POST

router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

// UPDATE || PUT 
router.put('/update-user',updateUser)

// export
module.exports = router;
