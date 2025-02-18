const MediaController=require("../../controllers/media-controller")
const express=require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const router=express.Router();
const upload=require("../../utils/multer")


router.post("/upload-video",upload.single("file"),MediaController.uploadVideo);

module.exports=router;