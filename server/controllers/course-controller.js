const CourseService = require("../services/course-service");
const courseService = new CourseService();

const createCourse = async (req, res) => {
  try {
    const course = await courseService.createCourse({
      ...req.body,
      creator: req.id,
    });
    return res.status(201).json({
      status: true,
      message: "Course created successfully",
      data: course,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in course-controller", error.message);
    return res.status(500).json({
      status: false,
      message: "Unable to create Course successfully",
      data: {},
      err: error,
    });
  }
};

const getCreatorCourses = async (req, res) => {
  try {
    const courses = await courseService.getCreatorCourses(req.id);

    if (courses.length === 0) {
      return res.status(404).json({
        data: {},
        message: "No courses found",
      });
    }
    return res.status(200).json({
      status: true,
      data: courses,
      message: "Courses found successfully",
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in course-controller", error.message);
    return res.status(500).json({
      status: false,
      message: "Unable to fetch Courses successfully",
      data: {},
      err: error,
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const thumbnail = req.file;

    let course = await courseService.findCourseById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }

    const updateData = { ...req.body, courseId, thumbnail };
    const response = await courseService.updateCourse(updateData);
    return res.status(200).json({
      status: true,
      data: response,
      message: "Course updated successfully",
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in course-controller", error.message);
    return res.status(500).json({
      status: false,
      message: "Unable to update Course successfully",
      data: {},
      err: error,
    });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await courseService.findCourseById(courseId);
    return res.status(200).json({
      status: true,
      message: "Course fetched successfully",
      data: course,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in course-controller", error.message);
    return res.status(500).json({
      status: false,
      message: "Unable to fetch Course successfully",
      data: {},
      err: error,
    });
  }
};

const getLectures = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { lectures } = await courseService.getLectures(courseId);
    //console.log(lectures);
    return res.status(200).json({
      status: true,
      message: "Course Lectures fetched successfully",
      data: lectures,
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in course-controller", error.message);
    return res.status(500).json({
      status: false,
      message: "Unable to fetch Course lectures successfully",
      data: {},
      err: error,
    });
  }
};

//Publish and Unpublish Course Logic

const togglePublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query; // true, false
    const course = await courseService.findCourseById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found!",
      });
    }
    // publish status based on the query paramter
    course.isPublished = publish === "true";
    await course.save();

    const statusMessage = course.isPublished ? "Published" : "Unpublished";
    return res.status(200).json({
      success: true,
      message: `Course is ${statusMessage} successfully`,
    });
  } catch (error) {
    console.log("Something went wrong in course-controller", error.message);
    return res.status(500).json({
      success: true,
      message: "Failed to update status",
      err: error,
    });
  }
};

const getPublishedCourses=async(req,res)=>{
  try {
    const courses=await courseService.getPublishedCourses();
    if(!courses){
      return res.status(404).json({
        message:"No Course Found"
      })
    }
    return res.status(200).json({
      success:true,
      data:courses,
      message:"Courses Fetched Successfully",
      err:{}
    })
  } catch (error) {
    console.log("Something went wrong in course-controller", error.message);
    return res.status(500).json({
      success: true,
      message: "Failed to fetch Published Courses",
      err: error,
  })
}
}

module.exports = {
  createCourse,
  getCreatorCourses,
  updateCourse,
  getCourseById,
  getLectures,
  togglePublishCourse,
  getPublishedCourses
};
