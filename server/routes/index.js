const express=require("express");
const router=express.Router();
const userRoutes=require("./v1/user");
const courseRoutes=require("./v1/course");
const lectureRoutes=require("./v1/lecture");
const mediaRoutes=require("./v1/media")
const purchaseRoutes=require("./v1/purchaseCourse");
const courseProgressRoutes=require("./v1/courseProgress");

router.use("/v1/user",userRoutes);
router.use("/v1/course",courseRoutes);
router.use("/v1/course",lectureRoutes);
router.use("/v1/media",mediaRoutes);
router.use("/v1/purchase",purchaseRoutes);
router.use("/v1/progress",courseProgressRoutes)

module.exports=router;

