const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {SECRET_KEY}=require("../config/serverConfig");
const validator=require("validator");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        validate: {
        validator: function (v) {
        // Name should only contain alphabets and spaces using regex for validation
        return /^[a-zA-Z\s]+$/.test(v);
      },
      message: props => `${props.value} is not a valid name! It should only contain alphabets and spaces.`,
    },
    },
    email:{
        type:String,
        required:true,
        unique: true,
        validate: {
        validator: function (v) {
        // Use validator's isEmail method for better validation(validator external npm package)
        return validator.isEmail(v);
      },
      message: props => `${props.value} is not a valid email!`,
    },
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["instructor","student"],
        default:"student"
    },
    enrolledCourses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    photoURL:{
        type:String,
        default:""
    }
},{timestamps:true});

userSchema.methods.comparePasswords=function compare(password){ //REMEMBER->yaha par fat arrow representation nahi use kar skte h
    return bcrypt.compareSync(password,this.password);
}
userSchema.methods.genJWT=function generate(){
    return jwt.sign({
           id:this._id,
           email:this.email
    },SECRET_KEY,{
           expiresIn:"1d"
    })
}
const User=mongoose.model("User",userSchema);
module.exports=User;