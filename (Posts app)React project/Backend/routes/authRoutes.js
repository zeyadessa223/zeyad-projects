const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validateToken = require("../middlewares/authMiddleware");

router.post("/signup", authController.signUpUser);
router.post("/login", authController.loginUser);
router.get("/", authController.getAllPosts);
router.get("/:id", authController.getPostById);
//router.post("/", authController.createPost);
router.post("/", authController.createPost);
router.put("/:id", validateToken, authController.updatePost);
router.delete("/:id", validateToken, authController.deletePost);

module.exports = router;
