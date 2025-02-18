const cloudinary=require("cloudinary").v2;
const {CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET,CLOUD_NAME} =require("../config/serverConfig")

cloudinary.config({
    api_key:CLOUDINARY_API_KEY,
    api_secret:CLOUDINARY_API_SECRET,
    cloud_name:CLOUD_NAME
})

const uploadMediaToCloudinary=async(file)=>{
    try {
        const uploadedMedia=await cloudinary.uploader.upload(file,{
            resource_type:"auto"
        })
        return uploadedMedia;
    } catch (error) {
        console.log(error);    
    }
}

const deleteMediaFromCloudinary=async(publicId)=>{
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log(error);  
    }
}

const deleteVideoFromCloudinary=async(publicId)=>{
    try {
        await cloudinary.uploader.destroy(publicId,{
            resource_type:"video"
        })
    } catch (error) {
        console.log(error);  
    }
}

module.exports={
    deleteMediaFromCloudinary,
    deleteVideoFromCloudinary,
    uploadMediaToCloudinary
}