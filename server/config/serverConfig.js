const dotenv=require("dotenv");
dotenv.config();
module.exports={
    PORT:process.env.PORT,
    MONGO_URI:process.env.MONGO_URI,
    SECRET_KEY:process.env.SECRET_KEY,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET,
    CLOUD_NAME:process.env.CLOUD_NAME,
    STRIPE_PUBLISHABLE_KEY:process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY:process.env.STRIPE_SECRET_KEY,
    WEBHOOK_ENDPOINT_SECRET:process.env.WEBHOOK_ENDPOINT_SECRET  //Remember this key will expire after 90 days and we need to do the same steps to generate the webhook_endpoint_secret again
}