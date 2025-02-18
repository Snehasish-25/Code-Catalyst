const UserService = require("../services/user-service");
const {
  deleteMediaFromCloudinary,
  uploadMediaToCloudinary,
} = require("../utils/cloudinary");
const userService = new UserService(); //creating an object



const signup = async (req, res) => {
  try {
    const response = await userService.signup(req.body);
    return res.status(201).json({
      status: true,
      data: response,
      message: "User created successfully",
      err: {},
    });
  } catch (error) {
    console.log("Something went wrong in user-controller", error.message)
    return res.status(500).json({
      status: false,
      data: {},
      message: "Unable to create user successfully",
      err: error,
    });
  }
};
const login = async (req, res) => {
  try {
    const response = await userService.login(req.body);
    const { user, token } = response;
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, //1 day expiry
      })
      .json({
        success: true,
        message: "Successfully logged in",
        data: user,
        err: {},
      });
  } catch (error) {
    console.log("Something went wrong in user-controller", error.message)
    return res.status(500).json({
      success: false,
      message: "Some error occured in user-controller",
      data: {},
      err: error,
    });
  }
};

const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {  //token delete kar diya
        httpOnly: true,
        sameSite: "strict",
        maxAge: 0,
      })
      .json({
        success: true,
        message: "Successfully logged out",
        err: {},
      });
  } catch (error) {
    console.log("Something went wrong in user-controller", error.message)
    return res.status(500).json({
      success: false,
      message: "Some error occured in user-controller",
      err: error,
    });
  }
};
const getUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      status: true,
      user,
    });
  } catch (error) {
    console.log("Something went wrong in user-controller", error.message)
    return res.status(500).json({
      success: false,
      message: "Some error occured in user-controller",
      err: error,
    });
  }
};

const updateProfile=async(req,res)=>{
  try {
        const userId=req.id;
        const {name}=req.body;
        const profilePhoto=req.file;

        const user=await userService.getUserById(userId);
        if(!user){//no user exists corresponding to the given id
            return res.status(404).json({
                success:false,
                message:"User Not Found"
            })
        }

        let updatedData={name,photoURL:user.photoURL};

        if(user.photoURL && profilePhoto){
            const publicId=user.photoURL.split('/').pop().split('.')[0]; //extracting the publicId from cloudinary photoUrl
            deleteMediaFromCloudinary(publicId);
        }
 
        if(profilePhoto)
        {
          const cloudResponse= await uploadMediaToCloudinary(profilePhoto.path);
          const photoUrl=cloudResponse.secure_url;
          updatedData={name,photoURL:photoUrl};
        }

        //Now upload this data
        const response=await userService.updateUserProfile(userId,updatedData);
        return res.status(200).json({
            status:true,
            message:"User Profile updated successfully",
            data:response,
            err:{}
        })

  } catch (error) {
    console.log("Something went wrong in user-controller", error.message)
    return res.status(500).json({
        success:false,
        message:"Some error occured in user-controller",
        data:{},
        err:error
  })
}
}

module.exports = {
  signup,
  login,
  logout,
  getUserProfile,
  updateProfile,
};
