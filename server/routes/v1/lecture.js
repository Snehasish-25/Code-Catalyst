const LectureController=require("../../controllers/lecture-controller");
const express=require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const upload =require("../../utils/multer");

const router=express.Router();

router.post("/:courseId/lecture",isAuthenticated,LectureController.createLecture);
router.post("/:courseId/lecture/:lectureId",isAuthenticated,LectureController.editLecture);
router.delete("/lecture/:lectureId",isAuthenticated,LectureController.removeLecture);
router.get("/lecture/:lectureId",isAuthenticated,LectureController.findLectureById);

module.exports=router;