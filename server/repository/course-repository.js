const Course = require("../models/course");
class CourseRepository {
  async createCourse(data) {
    try {
      const course = await Course.create(data);
      return course;
    } catch (error) {
      console.log("Something went wrong in course repository");
      throw error;
    }
  }

  async getCreatorCourses(creatorId) {
    try {
      const courses = await Course.find({
        creator: creatorId,
      });
      return courses;
    } catch (error) {
      console.log("Something went wrong in course repository");
      throw error;
    }
  }

  async findCourseById(id) {
    try {
      const course = await Course.findById(id);
      return course;
    } catch (error) {
      console.log("Something went wrong in course repository");
      throw error;
    }
  }

  async updateCourse(id, data) {
    try {
      const course = await Course.findByIdAndUpdate(id, data, { new: true });
      return course;
    } catch (error) {
      console.log("Something went wrong in course repository");
      throw error;
    }
  }

  async getLectures(id) {
    try {
      const lectures = await Course.findById(id).populate("lectures");
      return lectures;
    } catch (error) {
      console.log("Something went wrong in course repository",error.message);
      throw error;
    }
  }

  async removeLecturefromCourse(lectureId) {
    try {
      const result = await Course.updateOne(
        { lectures: lectureId }, // Find the course that contains the lecture
        { $pull: { lectures: lectureId } } // Remove the lecture ID from the lectures array
      );
  
      if (result.modifiedCount > 0) {
        console.log("Successfully deleted lecture from courses model in course repo");
      } else {
        console.log("No course found with the specified lecture ID.");
        // Optionally, throw an error if it's critical that the lecture ID must be removed
        throw new Error("No course contains the specified lecture ID.");
      }
    } catch (error) {
      console.log("Something went wrong in course repository:", error.message);
      throw error;
    }
  }
  
  async getPublishedCourses(){
    try {
      const courses=await Course.find({
        isPublished:true
      }).populate({path:"creator", select:"name photoURL"});
      return courses;
    } catch (error) {
      console.log("Something went wrong in course repository:", error.message);
      throw error;
    }
  }

}
module.exports = CourseRepository;
