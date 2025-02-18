const CourseProgress = require("../models/courseProgress");
const Course = require("../models/course");

const getCourseProgress = async (req, res) => {
  try {
    const {courseId} = req.params;
    const userId = req.id;

    //1.Fetch the CourseProgress corresponding to the user
    const courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    }).populate("courseId");
    //2.Get the courseDetails
    const courseDetails = await Course.findById(courseId).populate("lectures");

    if (!courseDetails) {
      return res.status(404).json({
        message: "Course Not Found",
      });
    }

    //3.If courseProgress is not found then simply return the courseDetails
    if (!courseProgress) {
      return res.status(200).json({
        data: {
          courseDetails,
          progress: [],
          completed: false,
        },
      });
    }

    
    //4.But if courseProgress is found then return course details along with corresponding user's courseProgress
    return res.status(200).json({
      data: {
        courseDetails,
        progress: courseProgress.lectureProgress,
        completed: courseProgress.completed,
      },
    });
  } catch (error) {
    console.log(
      "Something went wrong in CourseProgress-Controller:",
      error.message
    );
    return res.status(500).json({
      status: false,
      data: {},
      message: "Unable to get CourseProgress successfully",
      error: error.message,
    });
  }
};
const updateLectureProgress = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;
    const userId = req.id;

    //fetch the courseProgress
    let courseProgress = await CourseProgress.findOne({
      courseId,
      userId,
    });
    
    //if no progress exists then create a new record
    if (!courseProgress) {
      courseProgress = new CourseProgress({
        userId,
        courseId,
        completed: false,
        lectureProgress: [],
      });
    }
    //find the lectureProgress in the courseProgress
    const lectureIndex = await courseProgress.lectureProgress.findIndex(
      (lecture) => lecture.lectureId === lectureId
    );

    //if lectureIndex!=-1 that means lectureProgress already exists update its status
    //(yeh tab hoga when we are viewing the lecture not for the first time--> it may be marked as completed or may not be)
    if (lectureIndex !== -1) {
      courseProgress.lectureProgress[lectureIndex].viewed = true;
    } else {
      // Add new lecture progress(yeh tab hoga when we are viewing the lecture for the first time)
      courseProgress.lectureProgress.push({
        lectureId,
        viewed: true,
      });
    }

    // if all lectures are complete update CourseProgress status
    const lectureProgressLength = courseProgress.lectureProgress.filter(
      (lecture) => lecture.viewed == true
    ).length;

    const course = await Course.findById(courseId);

    if (course.lectures.length === lectureProgressLength)
      courseProgress.completed = true;

    await courseProgress.save();

    return res.status(200).json({
      success: true,
      message: "Lecture progress updated successfully.",
      err: {},
    });
  } catch (error) {
    console.log(
      "Something went wrong in CourseProgress-Controller:",
      error.message
    );
    return res.status(500).json({
      status: false,
      data: {},
      message: "Unable to update LectureProgress successfully",
      error: error.message,
    });
  }
};

const markAsCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const courseProgress = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgress)
      return res.status(404).json({ message: "Course Progress not found" });

    //Mark as completed button pe click karne se ab tak jitna lecture dekhe h woh sab lectureProgress 
    // wale array me present and so mark them all as viewed=true

    courseProgress.lectureProgress.map(
      (lectureProgress) => (lectureProgress.viewed = true)
    );

    courseProgress.completed = true;
    await courseProgress.save();
    return res.status(200).json({ 
        success:true,
        message: "Course marked as completed." ,
        err:{}
    });
  } catch (error) {
    console.log(
        "Something went wrong in CourseProgress-Controller:",error.message);
      return res.status(500).json({
        status: false,
        data: {},
        message: "Unable to perform markAsCompleted successfully",
        error: error.message,
      });
  }
};

 const markAsInCompleted = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const courseProgress = await CourseProgress.findOne({ courseId, userId });
    if (!courseProgress)
      return res.status(404).json({ message: "Course progress not found" });

    courseProgress.lectureProgress.map(
      (lectureProgress) => (lectureProgress.viewed = false)
    );
    courseProgress.completed = false;
    await courseProgress.save();
    return res.status(200).json({ 
        success:true,
        message: "Course marked as incompleted." ,
        err:{}
    });
  } catch (error) {
    console.log(
        "Something went wrong in CourseProgress-Controller:",error.message);
      return res.status(500).json({
        status: false,
        data: {},
        message: "Unable to perform markAsIncompleted successfully",
        error: error.message,
      });
  }
};

module.exports = {
  getCourseProgress,
  updateLectureProgress,
  markAsCompleted,
  markAsInCompleted
};
