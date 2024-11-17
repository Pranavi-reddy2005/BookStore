const router=require("express").Router();
const User=require('../models/UserModels')
const bcrypt=require("bcryptjs")
// const bcrypt=require('bcrypt')
// Sign Up
router.post("/sign-up",async(req,res)=>{
    try{
        const {username,email,password,adress}=req.body;
        if(username.length<4){
            return res.status(400).json({message:"username should be greater than 3"});
        }
        // check username already exist
        const existingUsername=await User.findOne({username:username});
        if(existingUsername){
            return res.status(400).json({message:"Username already exists!"});

        }
        const existingEmail=await User.findOne({email:email});
        if(existingEmail){
            return res.status(400).json({message:"Email already exists!"});
            
        }
        // check password length
        if(password.length<5){
            return res.status(400).json({message:"password should be greater than 5"});

        }
        const salt = await bcrypt.genSalt(10)
        const hashPass=await bcrypt.hash(password,salt);
        const newuser=new User({
            username:username,
            email:email,
            password:hashPass,
            adress:adress,

        });
        await newuser.save();
        return res.status(200).json({message:"SignUp Successfully done"});

            
        }
    
    catch(error){
        return res.status(500).json({message:"Internal Server Error"});
    }
});
router.post("/sign-in",async(req,res)=>{
    try{
        const{username,password}=req.body;
        const existingUser=await User.findOne({username});
        if(!existingUser){
            return res.status(400).json({message:"Invalid Credientials"});
        }
        await bcrypt.compare(password,existingUser.password,(err,data)=>{
            if(data){
                res.status(200).json({message:"Sign-in Successs"});

            }
            else{
                res.status(400).json({message:"Invalid Credientials"});
            }
        });
       
        }
        catch(error){
            return res.status(500).json({message:"Internal Server Error"});
            

        }
       
        });
module.exports=router;