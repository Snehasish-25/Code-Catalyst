const CourseProgressController=require("../../controllers/courseProgress-controller");
const express=require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const {getCourseProgress,updateLectureProgress,markAsCompleted,markAsInCompleted}=CourseProgressController;
const router = express.Router()

router.get("/:courseId", isAuthenticated, getCourseProgress);
router.post("/:courseId/lecture/:lectureId/view", isAuthenticated, updateLectureProgress);
router.post("/:courseId/complete",isAuthenticated, markAsCompleted)
router.post("/:courseId/incomplete",isAuthenticated, markAsInCompleted);

module.exports=router;