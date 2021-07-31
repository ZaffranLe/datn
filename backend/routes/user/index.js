const express = require("express");
const userController = require("../../api/controller/user-controller");
const verifyToken = require("../../api/middleware/verify-token");
const router = express.Router();

router.put("/self", verifyToken, userController.updateSelf);
router.post("/check-slug", verifyToken, userController.checkSlugExist);
router.get("/url/:slug", verifyToken, userController.getUserBySlug);
router.get("/info/slug/:slug", verifyToken, userController.getUserBasicInfoBySlug);
router.get("/info/id", verifyToken, userController.getUserBasicInfoById);
router.get("/follow/:id", verifyToken, userController.checkFollowUser);
router.post("/follow", verifyToken, userController.changeFollowUser);
router.post("/skip", verifyToken, userController.changeSkipUser);
router.get("/suggestion", verifyToken, userController.getUserSuggestions);
router.get("/search", verifyToken, userController.searchUser);

module.exports = router;
