const User=require("../models/user");
class UserRepository{
    async create(data)
    {
        try {
            const user=await User.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in user-repository");
            throw(error);   
        }
    }
    async findByEmail(data){
        try {
            const user=await User.findOne({
                email:data
            });
            return user;
        } catch (error) {
            console.log("Something went wrong in the user-repository layer");
            throw(error);
            
        }
    }
  
      

    async getUserById(id){
        try {
            const user=await User.findById(id).select("-password").populate({
                path: "enrolledCourses",
                populate: { path: "creator", select: "name" }, // Populating creator
              });
            return user;
        } catch (error) {
            console.log("Something went wrong in the user-repository layer");
            throw(error);
            
        }
    }

    async updateUserProfile(id,updatedData){
        try {
            const user=await User.findByIdAndUpdate(id,updatedData,{new:true}).select("-password");
            return user;
        } catch (error) {
            console.log("Something went wrong in the user-repository layer");
            throw(error);
        }
    }
}
module.exports=UserRepository;