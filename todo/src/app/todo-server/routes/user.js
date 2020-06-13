const express=require('express');
const bcrypt=require('bcrypt');
const router=express.Router();
const jwt=require('jsonwebtoken')
const User=require('../models/user-schema')


router.post('/signup',(req,res)=>{
    User.find({email:req.body.email}).then((docs)=>
    {
        console.log(123)
        if(docs.length>0)
        {
            console.log(123)
            return res.send({message:"Email already Exists"})
        }
        if(docs.length===0){
          
        bcrypt.hash(req.body.password,10).then(hash=>
            {
            const user=new User(
            {
                email:req.body.email,
                password:hash
            })
            user.save().then(result=>
            {
                res.status(200).json({message:"Successfully Created"})
            }).catch((err)=>
            {
                res.send({message:"Internal Server Error"})
            })
    
        })
    }
        
    })
})

router.post('/login',(req,res)=>{

    User.findOne({email:req.body.email}).then((docs)=>{
        if(!docs)
        {
             return  res.send({message:"User Dosent Exit,Create New Account"})
        }
        if(docs){
            bcrypt.compare(req.body.password,docs.password).then((result)=>
            {
                if(result===true)
                {
                    const token=jwt.sign({email:docs.email,id:docs._id},"Secret_Token_Is_Generated",{expiresIn:'1h'})
                    res.status(200).json({message:"User Registrated Successfully",token:token})
                }
                if(result===false)
                {
                    res.send({message:"Wrong Crediantls"})
                }
            
        }).catch((err)=>
        {
            res.send({message:"Internal Server Error"})
        })}

    }).catch((err)=>
    {
        res.send({message:"Internal Server Error"})
    })

})



module.exports=router