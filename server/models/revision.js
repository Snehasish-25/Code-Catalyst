const mongoose = require('mongoose');

const revisionSchema =mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: {  type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true},
  lectureId: {  type: mongoose.Schema.Types.ObjectId, ref: 'Lecture', required: true },
  originalCompletionDate: { type: Date, required: true },
  revisionSchedule: [
    {
      date: { type: Date, required: true },
      completed: { type: Boolean, default: false }
    }
  ]
}, { timestamps: true });

const Revision = mongoose.model('Revision', revisionSchema);
module.exports=Revision;
