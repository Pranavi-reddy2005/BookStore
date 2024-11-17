const router=require("express").Router();
const User=require('../models/UserModels')
const jwt=require('jsonwebtoken')
const Book=require('../models/BooksModel')
const {authenticateToken}=require('./AuthRoute')
// add book--admin
router.post("/addbook",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const user=await User.findById(id);
        if(user.role!=="admin"){
            return res.status(400).json({message:"Your not having access to perform admin work"});
        }
        const book=new Book({
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language,
        });
        await book.save();
        return res.status(200).json({message:"Book added successfully"})

    }catch(error){
        return res.status(500).json({message:"internal server error"})
    }
});
module.exports=router