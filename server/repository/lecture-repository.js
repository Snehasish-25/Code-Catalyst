const Lecture = require("../models/lecture.js");
class LectureRepository {
  async createLecture(data) {
    try {
      // console.log("From repository");
      // console.log(data);

      const lecture = await Lecture.create(data);

      // console.log("From repository");
      // console.log(lecture);
      return lecture;
    } catch (error) {
      console.log("Something went wrong in Lecture-Repository");
      throw error;
    }
  }

  async findLectureById(lectureId) {
    try {
      const lecture = await Lecture.findById(lectureId);
      return lecture;
    } catch (error) {
      console.log("Something went wrong in Lecture-Repository");
      throw error;
    }
  }

  async removeLecture(lectureId) {
    try {
      const lecture = await this.findLectureById(lectureId);
      if (!lecture) {
        console.log("No lecture exists with id", lectureId);
        throw new Error("No such Lecture exists");
      }

      // Delete the lecture
      await Lecture.findByIdAndDelete(lectureId);
      return lecture; // Return the deleted lecture object because we use this in Lecture Service layer
    } catch (error) {
      console.log("Something went wrong in Lecture-Repository:", error.message);
      throw error;
    }
  }
}
module.exports = LectureRepository;
