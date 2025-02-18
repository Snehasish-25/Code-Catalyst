const bcrypt=require("bcrypt");
const UserRepository=require("../repository/user-repository");

class UserService{
    constructor()
    {
        this.userRepository=new UserRepository;
    }
    async signup(data){
        try {
        const {name,email,password}=data;
        if(!name || !email || !password){
            throw({
                status:false,
                message:"All fields are mandatory"
            });  
        }
        const existingUser=await this.findByEmail(email);
        
        if(existingUser){
           throw({
                success:false,
                message:"User already exists with this email"
            })
        }
        const SALT= await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hashSync(password,SALT);  //generating the hashed password
        const user=await this.userRepository.create({
            name,
            email,
            password:hashedPassword
        });
         return user;
        }
         catch (error) {
            console.log("Something went wrong in the user-service layer");
            throw(error);  
        }
    }

    async login(data){
        try {
            const {email,password}=data;
            if(!email || !password){
                throw({
                    status:false,
                    message:"All fields are mandatory"
                })
            }
            const existingUser=await this.findByEmail(email);
            
            if(!existingUser){  
                throw({
                    status:false,
                    message:"Incorrect email"
                })
            }
            
            if(!existingUser.comparePasswords(password)){  //if user exists but password is wrong
                throw({
                     success:false,
                     message:"Incorrect Password"
                 })
             }
             else{
                const token=existingUser.genJWT();
                return {
                    user:existingUser,
                    token:token
                };
             }
   
        } catch (error) {
               console.log("Something went wrong in the user-service layer");
               throw(error);
               
        }
    }


    async findByEmail(data){
        try {
            const user=await this.userRepository.findByEmail(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the user-service layer");
            throw(error);
            
        }
    }

    async getUserById(id){
        try {
            const user=await this.userRepository.getUserById(id);
            return user;
        } catch (error) {
            console.log("Something went wrong in the user-service layer");
            throw(error);
            
        }
    }

    async updateUserProfile(id,updatedData){
        try {
            const user=await this.userRepository.updateUserProfile(id,updatedData);
            return user;
        } catch (error) {
            console.log("Something went wrong in the user-service layer");
            throw(error);  
        }
    }
}
module.exports=UserService;