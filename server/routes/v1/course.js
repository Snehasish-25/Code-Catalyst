const CourseController=require("../../controllers/course-controller");
const SearchCourseController=require("../../controllers/searchCourse-controller");
const express=require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const upload =require("../../utils/multer")

const router=express.Router();

router.post("/",isAuthenticated,CourseController.createCourse);
router.get("/search",isAuthenticated,SearchCourseController.searchCourse);
router.get("/",isAuthenticated,CourseController.getCreatorCourses);
router.get("/published-courses",CourseController.getPublishedCourses);
router.put("/:courseId",isAuthenticated,upload.single("courseThumbnail"),CourseController.updateCourse);
router.get("/:courseId",isAuthenticated,CourseController.getCourseById);
router.get("/:courseId/lecture",isAuthenticated,CourseController.getLectures);
router.patch("/:courseId",isAuthenticated,CourseController.togglePublishCourse);

module.exports=router;