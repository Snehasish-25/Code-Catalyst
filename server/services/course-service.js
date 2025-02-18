const CourseRepository = require("../repository/course-repository");
const {
  deleteMediaFromCloudinary,
  uploadMediaToCloudinary,
} = require("../utils/cloudinary");
class CourseService {
  constructor() {
    this.courseRepository = new CourseRepository();
  }
  async createCourse(data) {
    try {
      const { title, category } = data;
      if (!title || !category)
        throw {
          status: false,
          message: "Title and Category are required",
        };
      const course = await this.courseRepository.createCourse(data);
      return course;
    } catch (error) {
      console.log("Something went wrong in course-service layer");
      throw error;
    }
  }
  async getCreatorCourses(userId) {
    try {
      const courses = this.courseRepository.getCreatorCourses(userId);
      return courses;
    } catch (error) {
      console.log("Something went wrong in course-service layer");
      throw error;
    }
  }
  async updateCourse(updateData) {
    try {
      const {
        title,
        subTitle,
        description,
        category,
        courseLevel,
        coursePrice,
        thumbnail,
        courseId,
      } = updateData;

      let courseThumbnail;
      const course = await this.courseRepository.findCourseById(courseId);
      if (thumbnail) {
        if (course.courseThumbnail) {
          //if thumbnail already exists
          const publicId = course.courseThumbnail
            .split("/")
            .pop()
            .split(".")[0];
          await deleteMediaFromCloudinary(publicId); // delete old image
        }
        // upload a thumbnail on cloudinary

        courseThumbnail = await uploadMediaToCloudinary(thumbnail?.path);
      }

      const newUpdatedData = {
        title,
        subTitle,
        description,
        category,
        courseLevel,
        coursePrice,
        courseThumbnail: courseThumbnail?.secure_url,
      };

      const response = await this.courseRepository.updateCourse(
        courseId,
        newUpdatedData
      );
      return response;
    } catch (error) {
      console.log("Something went wrong in course-service layer");
      throw error;
    }
  }

  async findCourseById(id) {
    try {
      const course = await this.courseRepository.findCourseById(id);
      return course;
    } catch (error) {
      console.log("Something went wrong in course-service layer");
      throw error;
    }
  }

  async getLectures(id) {
    try {
      const lectures = await this.courseRepository.getLectures(id);
      return lectures;
    } catch (error) {
      console.log("Something went wrong in course-service layer",error.message);
      throw error;
    }
  }

  async getPublishedCourses() {
    try {
      const courses = await this.courseRepository.getPublishedCourses();
      return courses;
    } catch (error) {
      console.log("Something went wrong in course-service layer",error.message);
      throw error;
    }
  }
}

module.exports = CourseService;
