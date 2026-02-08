const bcypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User=require('../Models/userModel')

class authController{

   static async  register(req,res) {
    const {name,email,password}=req.body;
    if(!name || !email || !password)
    {
        return res.status(400).json({success:false,message:"Missing Details"});
    }
    try{
        const existingUser=await User.find({email});
        if(!existingUser)
        {
            return res.status(409).json({success:false,message:"User is already exit"})
        }
        const hashPassword=await bcypt.hash(password,10);

        const user=new User({name,email,password:hashPassword});
          await user.save();


          return res.status(200).json({success:true,message:"User Registration Successfull"});

    }
    catch(error)
    {
        console.error("Error : ",error.message);
        return res.json(500).json({success:false,error:error.message,nessage:"Internal Server Error"})
    }
   }

   static async login(req,res){
    const {email,password}=req.body;
    if(!password || !email)
    {
        return res.status(400).json({success:false,message:"Email and Password not be empty"});
    }
    try{
        const user=await User.findOne({email});
       
        if(!user)
        {
             return res.status(404).json({success:false,message:"User does not exit"});
        }
        const isMatch=await bcypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.status(401).json({success:false,message:"Password does not match"})
        }
               const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
          res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production' ? 'none' : 'strict',
            maxAge:7*24*60*60*1000
          });
          return res.status(200).json({success:true,message:"User Login Successfull"});

    }
    catch(error)
    {
        console.error("Error : ",error.message);
        return res.status(500).json({success:false,message:"Internal Server Error",error:error.message})
    }
   }
   static async logout(req,res){
    try{
          res.clearCookie('token',
            {
                httpOnly:true,
                secure:process.env.NODE_ENV==='production',
                sameSite:process.env.NODE_ENV=='production'?'none':'strict'
            }
          )
          return res.status(200).json({success:true,message:"Log out successfull"});
    }
    catch(error)
    {
     console.log("Error : ",error.message);
     return res.status(500).json({success:false,message:error.message});
    }
   }

   static async getData(req,res){
    try{
       const data=await User.find();
       if(!data)
       {
        return res.staus(404).json({success:false,message:"Empty Data"});
       }
        return res.status(200).json({success:true,message:"Data get Successfull",data:data});
    }
    catch(error)
    {
        console.log("Error : ",error);
        return res.status(500).json({success:false,message:error.message})
    }
   }
   static async deleteData(req,res){
    const id=req.params.id;
    if(!id)
    {
        return res.staus(400).json({success:false,message:"Id can not be empty"});
    }
    try{
        const data=await User.deleteOne({_id:id});
          if(!data)
          {
            return res.status(404).json({success:false,message:"Data not Found"});
          }
          return res.staus(200).json({success:true,message:"Data delete successfull"});

    }
    catch(error)
    {
        console.log("Error : ",error);
        return res.status(500).json({success:false,message:error.message})
    }
   }
}
module.exports=authController;