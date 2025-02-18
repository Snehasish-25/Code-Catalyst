const {uploadMediaToCloudinary}=require("../utils/cloudinary")

const uploadVideo =async (req,res) => {
    try {
        const result = await uploadMediaToCloudinary(req.file.path);
        return res.status(200).json({
            success:true,
            message:"File uploaded successfully.",
            data:result,
            err:{}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status:false,
            message:"Error uploading file",
            data:{},
            err:error
        })
    }
}
module.exports = {
    uploadVideo
  };
  