const jwt=require("jsonwebtoken"); 
const { SECRET_KEY } = require("../config/serverConfig");
const isAuthenticated= async (req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){  //If no token is present with the req body
            return res.status(401).json({
                status:false,
                message:"User is not authenticated"
            })
        }
            const decode=await jwt.verify(token, SECRET_KEY);
            if(!decode){  //if token does not match with the one generated
                return res.status(401).json({
                    status:false,
                    message:"Invalid Token"
                })
            }
            //console.log(decode);
            req.id=decode.id;
            next();
        }
     catch (error) {
        console.log("Some error occured in middleware ", error)
    }
}
module.exports=isAuthenticated;