const mongoose=require("mongoose");
const {MONGO_URI}=require("./serverConfig")
const connect=async()=>{
    await mongoose.connect(MONGO_URI);
    console.log("MongoDb connected successfully");
}
module.exports=connect;