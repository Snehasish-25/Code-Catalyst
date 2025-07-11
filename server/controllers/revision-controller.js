const Revision = require("../models/revision");

const createRevision = async (req, res) => {
  try {
    const { userId, courseId, lectureId, completedOn } = req.body;
    const existingRevision = await Revision.findOne({
      userId,
      courseId,
      lectureId,
    });

    if (existingRevision) {
      return res.status(200).json({
        message: "Revision plan already exists",
        data: existingRevision,
        err: {},
      });
    }
    const baseDate = new Date(completedOn);
    const intervals = [3, 7, 15, 30];

    const revisionSchedule = intervals.map((days) => ({
      date: new Date(baseDate.getTime() + days * 24 * 60 * 60 * 1000),
      completed: false,
    }));

    const revision = new Revision({
      userId,
      courseId,
      lectureId,
      originalCompletionDate: baseDate,
      revisionSchedule,
    });

    const savedRevision = await revision.save();
    return res.status(201).json({
      status: true,
      message: "Revision Schedule created successfully",
      data: savedRevision,
      err: {},
    });
  } catch (error) {
    console.log(
      "Something went wrong in revision-controller createRevision",
      error.message
    );
    return res.status(500).json({
      status: false,
      message: "Unable to create Revision Schedule successfully",
      data: {},
      err: error,
    });
  }
};

const getUpcomingRevisions = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId || userId === "undefined") {
      return res.status(400).json({ message: "Invalid or missing User ID" });
    }
    const today = new Date();
    const revisions = await Revision.find({
      userId,
      "revisionSchedule.date": { $gte: today },
    }).populate({ path: "courseId", select: "title" })  
      .populate({ path: "lectureId", select: "lectureTitle" }).sort({ "revisionSchedule.date": 1 });


    return res.status(200).json({
      status: true,
      message: "Revision Schedule fetched successfully",
      data: revisions,
      err: {},
    });
  } catch (error) {
    console.log(
      "Something went wrong in revision-controller getUpcomingRevisions",
      error.message
    );
    return res.status(500).json({
      status: false,
      message: "Unable to fetch Schedule successfully",
      data: {},
      err: error,
    });
  }
};

const markRevisonCompleted = async (req, res) => {
  try {
    const { revisionId, scheduleIndex } = req.params;
    const revision = await Revision.findById(revisionId);

    if (!revision)
      return res.status(404).json({ message: "Revision record not found" });

    revision.revisionSchedule[scheduleIndex].completed = true;
    await revision.save();

    return res.status(200).json({
      status: true,
      message: "Revision marked as completed successfully",
      data: revision,
      err: {},
    });
  } catch (error) {
    console.log(
      "Something went wrong in revison-controller markRevisonCompleted",
      error.message
    );
    return res.status(500).json({
      status: false,
      message: "Unable to mark revison as completed successfully",
      data: {},
      err: error,
    });
  }
};

module.exports = {
  createRevision,
  getUpcomingRevisions,
  markRevisonCompleted,
};
