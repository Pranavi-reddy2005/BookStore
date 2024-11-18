const router=require("express").Router();
const {authenticateToken}=require('./AuthRoute');
const Book=require('../models/BooksModel');
const Order=require('../models/OrdersModel');
const User=require('../models/UserModels')
router.post('/place-order',authenticateToken,async(req,res)=>{
    try{
        const{id}=req.header;
        const{order}=req.body;
        for(const orderData of order){
            const newOrder=new Order({user:id,book:orderData._id});
                const orderDataFromDb=await newOrder.save();
              //saving order in user model  
            await User.findByIdAndUpdate(id,{
                $push:{orders:orderDataFromDb._id},
            });
            //clear cart
                await User.findByIdAndUpdate(id,{
                    $pull:{cart:orderData._id},
            });
        }
        return res.json({
            status:"Success",message:"Order Placed Successfully",
        });

    }
    catch(error){
        return res.status(500).json({message:"An error occured"})
    }
});
router.get('/order-history',authenticateToken,async(req,res)=>{
    try{
        const{id}=req.headers;
        const userData=await User.findById(id).populate({
            path:"orders",
            populate:{path:"book"},
        });
        const ordersData=userData.orders.reverse();
        return res.json({
            status:"Success",
            data:ordersData,
        });

    }
    catch(error){
        return res.status(500).json({message:"An error occured"})
    }
});
//get all orders--admin
router.get('/all-orders',authenticateToken,async(req,res)=>{
    try{
        const userData=await Order.findOne().populate({
            path:"book",

        })
        .populate({
            path:"user",
        })
      .sort({createdAt:-1});
      return res.json({
        status:"Success",
        data:userData,
      });

    }
    catch(error){
        return res.status(500).json({message:"An error occured"})
    }
});
router.put('/update-status/:id',authenticateToken,async(req,res)=>{
    try{
        const{id}=req.params;
        await Order.findByIdAndUpdate(id,{status:req.body.status});
        return res.json({status:"Success",message:"Status Updated Successfully",});
    }
    catch(error){
        return res.status(500).json({message:"An error occured"})
    }
});
module.exports=router;
