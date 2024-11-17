const router=require("express").Router();
const User=require('../models/UserModels')
const {authenticateToken}=require('./AuthRoute')
//add book to favourite
router.put("/add-favourite",authenticateToken,async(req,res)=>{
    try{
        const{bookid,id}=req.headers;
        const userData=await User.findById(id);
        const isBookFavourite=userData.favourites.includes(bookid);
        if(isBookFavourite)
        {
            return res.status(200).json({message:"Book is already in favourites!"});
        }
        await User.findByIdAndUpdate(id,{$push:{favourites:bookid}});
        return res.status(200).json({message:"Book added to favourites!"});

    }
    catch(error){
        return res.status(500).json({message:"Internal Server error"})
    }
});
router.delete("/delete-favourite",authenticateToken,async(req,res)=>{
    try{
        const{bookid,id}=req.headers;
        const userData=await User.findById(id);
        const isBookFavourite=userData.favourites.includes(bookid);
        if(isBookFavourite)
        {
            return res.status(200).json({message:"Book is already in favourites!"});
        }
        await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
        return res.status(200).json({message:"Book deleted from  favourites!"});

    }
    catch(error){
        return res.status(500).json({message:"Internal Server error"})
    }
});
router.get("/get-favourite",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const userData=await User.findById(id).populate("favourites");
        const favouriteBooks=userData.favourites;
        return res.json({status:"Success",data:favouriteBooks,});
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"An error occurred"})
    }
    
});
module.exports=router