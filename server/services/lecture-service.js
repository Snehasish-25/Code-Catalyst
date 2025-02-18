const LectureRepository = require("../repository/lecture-repository");
const CourseRepository = require("../repository/course-repository");
class LectureService {
  constructor() {
    this.lectureRepository = new LectureRepository();
    this.courseRepository = new CourseRepository();
  }
  async createLecture(data) {
    try {
      const { lectureTitle, courseId } = data;

      const lecture = await this.lectureRepository.createLecture({
        lectureTitle,
      });
      const course = await this.courseRepository.findCourseById(courseId);

      if (course) {
        await this.courseRepository.updateCourse(
          courseId,
          { $push: { lectures: lecture._id } },
          { new: true }
        );
      }

      return lecture;
    } catch (error) {
      console.log("Something went wrong in Lecture-Service");
      throw error;
    }
  }

  async findLectureById(lectureId) {
    try {
      const lecture = await this.lectureRepository.findLectureById(lectureId);
      return lecture;
    } catch (error) {
      console.log("Something went wrong in Lecture-Service");
      throw error;
    }
  }

  async editLecture({ data, courseId, lectureId }) {
    try {
      //console.log("From service data",data);
      const { lectureTitle, videoInfo, isPreviewFree } = data;
      const lecture = await this.findLectureById(lectureId);

      if (lectureTitle) lecture.lectureTitle = lectureTitle;
      if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
      if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
       lecture.isPreviewFree = isPreviewFree;

      await lecture.save();

      //Ensure ki corresponding course has the lecture contained in it
      const course = await this.courseRepository.findCourseById(courseId);
      if (course && !course.lectures.includes(lecture._id)) {
        course.lectures.push(lecture._id);
        await course.save();
      }

      return lecture;
    } catch (error) {
      console.log("Something went wrong in Lecture-Service");
      throw error;
    }
  }

  async removeLecture(lectureId) {
    try {
      // Remove the lecture from the lecture repository
      const lecture = await this.lectureRepository.removeLecture(lectureId);

      // Remove the lecture video from Cloudinary
      if (lecture.publicId) {
        await deleteVideoFromCloudinary(lecture.publicId);
      }

      // Remove the lecture reference from the associated course
      await this.courseRepository.removeLecturefromCourse(lectureId);
    } catch (error) {
      console.log("Something went wrong in Lecture-Service:", error.message);
      throw error;
    }
  }
}
module.exports = LectureService;
