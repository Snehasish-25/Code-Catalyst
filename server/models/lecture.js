const mongoose = require("mongoose");
const LectureSchema = mongoose.Schema({
  lectureTitle: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
  },
  publicId: {
    type: String,
  },
  isPreviewFree: {
    type: Boolean,
  },
},{timestamps:true});

const Lecture=mongoose.model("Lecture",LectureSchema);
module.exports=Lecture;
