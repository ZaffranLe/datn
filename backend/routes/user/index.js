const express = require("express");
const userController = require("../../api/controller/user-controller");
const verifyToken = require("../../api/middleware/verify-token");
const router = express.Router();

router.put("/self", verifyToken, userController.updateSelf);
router.post("/check-slug", verifyToken, userController.checkSlugExist);
router.get("/url/:slug", verifyToken, userController.getUserBySlug);
router.get("/follow/:id", verifyToken, userController.checkFollowUser);
router.post("/follow", verifyToken, userController.changeFollowUser);

module.exports = router;
