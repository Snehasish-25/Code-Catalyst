const RevisionController=require("../../controllers/revision-controller");
const express=require("express");
const isAuthenticated = require("../../middlewares/isAuthenticated");

const router=express.Router();

router.post("/",isAuthenticated,RevisionController.createRevision);
router.put("/:revisionId/:scheduleIndex",isAuthenticated,RevisionController.markRevisonCompleted);
router.get("/:userId",isAuthenticated,RevisionController.getUpcomingRevisions);

module.exports=router;