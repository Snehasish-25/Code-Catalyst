const UserController=require("../../controllers/user-controller")
const express=require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const router=express.Router();
const upload=require("../../utils/multer")


router.post("/signup",UserController.signup);
router.post("/login",UserController.login);
router.get("/logout",UserController.logout);
router.get("/profile",isAuthenticated,UserController.getUserProfile);
router.put("/profile/update",isAuthenticated,upload.single("profilePhoto"),UserController.updateProfile);

module.exports=router;