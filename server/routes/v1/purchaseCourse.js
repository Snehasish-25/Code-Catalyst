const CoursePurchaseController=require("../../controllers/coursePurchase-controller.js")
const express=require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");

const router=express.Router();


router.get("/course/:courseId/detail-with-status",isAuthenticated,CoursePurchaseController.getCourseDetailWithPurchaseStatus);
router.post("/checkout/create-checkout-session",isAuthenticated,CoursePurchaseController.createCheckOutSession);
router.post("/webhook",express.raw({type:"application/json"}),CoursePurchaseController.stripeWebhook);
router.get("/",CoursePurchaseController.getAllPurchasedCourses);

module.exports=router;