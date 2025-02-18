const Stripe = require("stripe");
const { STRIPE_SECRET_KEY } = require("../config/serverConfig");
const CourseService = require("../services/course-service");
const CoursePurchase = require("../models/coursePurchase");
const Lecture = require("../models/lecture");
const Course=require("../models/course");
const User=require("../models/user")

const stripe = new Stripe(STRIPE_SECRET_KEY);
const courseService = new CourseService();
//const coursePurchase=new CoursePurchase();

const createCheckOutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;
    const course = await courseService.findCourseById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course Not found",
      });
    }

    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
    });

    //create a stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.title,
              images: [course.courseThumbnail],
            },
            unit_amount: course.coursePrice * 100, // Amount in paise (lowest denomination)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/course-progress/${courseId}`, // once payment successful redirect to course progress page
      cancel_url: `http://localhost:5173/course-detail/${courseId}`, //Redirect  to course-detail page only if payment fails
      metadata: {
        courseId: courseId,
        userId: userId,
      },
      shipping_address_collection: {
        allowed_countries: ["IN"], // Optionally restrict allowed countries
      },
    });

    if (!session.url) {
      return res
        .status(400)
        .json({ success: false, message: "Error while creating session" });
    }

    // Update and save the purchase record
    newPurchase.paymentId = session.id;
    await newPurchase.save();

    return res.status(200).json({
      success: true,
      url: session.url, // Return the Stripe checkout URL
    });
  } catch (error) {
    console.log(
      "Something went wrong in course-Purchase Controller ",
      error.message
    );
  }
};

/* High-Level Flow

1.Webhook Received: Stripe sends a webhook event to the server.
2.Validate Event: The server verifies the event's authenticity using the payload and secret.
3.Check Event Type: The server processes only checkout.session.completed events.

4.Database Operations:
   -->.Retrieve purchase details.
   -->.Update the purchase status and payment amount.
   -->.Make all lectures in the course accessible to the user.
   -->.Update the user's enrolled courses and the course's enrolled students.

9.Error Handling: Logs errors and sends appropriate HTTP status codes.
10.Acknowledge Stripe: Sends a 200 OK response to confirm successful processing.*/

const stripeWebhook = async (req, res) => {
  let event;

  try {
    const payloadString = JSON.stringify(req.body, null, 2);
    const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret,
    });

    event = stripe.webhooks.constructEvent(payloadString, header, secret);
  } catch (error) {
    console.error("Webhook error:", error.message);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  // Handle the checkout session completed event
  if (event.type === "checkout.session.completed") {
    console.log("check session complete is called");

    try {
      const session = event.data.object;

      const purchase = await CoursePurchase.findOne({
        paymentId: session.id,
      }).populate({ path: "courseId" });

      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }

      if (session.amount_total) {
        purchase.amount = session.amount_total / 100;
      }
      purchase.status = "completed";
      await purchase.save();

      // Make all lectures visible by setting `isPreviewFree` to true
      if (purchase.courseId && purchase.courseId.lectures.length > 0) {
        await Lecture.updateMany(
          { _id: { $in: purchase.courseId.lectures } },
          { $set: { isPreviewFree: true } }
        );
      }

        // Update course to add user ID to enrolledStudents
        await Course.findByIdAndUpdate(
          purchase.courseId._id,
          { $addToSet: { enrolledStudents: purchase.userId } }, // Add user ID to enrolledStudents
          { new: true }
        );

      // Update user's enrolledCourses
      await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCourses: purchase.courseId._id } },
        { new: true }
        // Add course ID to enrolledCourses.
        // $addToSet ensures the course ID is added only once, preventing duplicates.
      );

    
    } catch (error) {
      console.error("Error handling event:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  res.status(200).send();
  //Once the webhook event is processed successfully, the code sends a 200 OK response back to Stripe.
  //This response indicates that the server has handled the event and no retries are necessary.
};

const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId)
      .populate({ path: "creator" })
      .populate({ path: "lectures" });

    if (!course)
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    const purchase = await CoursePurchase.findOne({
      userId: userId,
      courseId: courseId,
    });

    return res.status(200).json({
      success: true,
      course,
      purchased: purchase ? true : false,
    });
  } catch (error) {
    console.log(
      "Something went wrong in CoursePurchase Controller",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Unable to get Course Detail With Purchase Status",
      data: {},
      err: error,
    });
  }
};

const getAllPurchasedCourses = async (req, res) => {
  try {
    const purchasedCourses = await CoursePurchase.find({
      status: "completed",
    }).populate({ path: "courseId" });

    if(!purchasedCourses){
      return res.status(404).json({
        message:"NoCourses Purchased yet",
        data:[]
      })
    }

    return res.status(200).json({
      success:true,
      message:"Purchased Courses fetched Successfully",
      data:purchasedCourses,
      err:{}
    })
  } catch (error) {
    console.log(
      "Something went wrong in CoursePurchase Controller",
      error.message
    );
    return res.status(5000).json({
      success: false,
      message: "Unable to get Purchased Courses",
      data: {},
      err: error,
    });
  }
};

module.exports = {
  createCheckOutSession,
  stripeWebhook,
  getCourseDetailWithPurchaseStatus,
  getAllPurchasedCourses
};
