const LectureService = require("../services/lecture-service");
const lectureService = new LectureService();

const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(404).json({
        status: false,
        message: "Lecture title is required",
      });
    }
    const lecture = await lectureService.createLecture({
      lectureTitle,
      courseId,
    });
    return res.status(201).json({
      status: true,
      data: lecture,
      message: "Lecture created successfully",
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in Lecture-Controller", error.message);
    return res.status(500).json({
      status: false,
      data: {},
      message: "Unable to create Lecture Successfully",
      err: {},
    });
  }
};

const editLecture=async(req,res)=>{
  try {
    const {courseId,lectureId}=req.params;

    const lecture=await lectureService.findLectureById(lectureId);
    if(!lecture){  //lecture not found
      return res.status(404).json({
        success:false,
        message:"Lecture Not Found"
      })
  }
  //console.log("From controller data",req.body);
    const response=await lectureService.editLecture({data:req.body,courseId,lectureId});
    return res.status(200).json({
      success:true,
      message:"Lecture updated successfully",
      data:response,
      err:{}
    })
  } catch (error) {
    console.log("Something went wrong in Lecture-Controller", error.message);
    return res.status(500).json({
      status: false,
      data: {},
      message: "Unable to edit Lecture Successfully",
      err: {},
    });
  }
}

const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    await lectureService.removeLecture(lectureId);
    return res.status(200).json({
      success: true,
      message: "Lecture deleted successfully",
    });
  } catch (error) {
    console.log("Something went wrong in Lecture-Controller:", error.message);
    return res.status(500).json({
      status: false,
      data: {},
      message: "Unable to remove Lecture successfully",
      error: error.message,
    });
  }
};

const findLectureById=async (req,res)=>{
  try {
    
    const {lectureId}=req.params;
    let lecture=await lectureService.findLectureById(lectureId);
    console.log(lecture);
    
    return res.status(200).json({
      success: true,
      message: "Lecture details fetched successfully",
      data:lecture,
      err:{}
    });
  } catch (error) {
    console.log("Something went wrong in Lecture-Controller:", error.message);
    return res.status(500).json({
      status: false,
      data: {},
      message: "Unable to remove Lecture successfully",
      error: error.message,
    });
  }
}



module.exports = {
  createLecture,
  editLecture,
  removeLecture,
  findLectureById
};
