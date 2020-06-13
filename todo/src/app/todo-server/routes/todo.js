const express=require('express')
const router=express.Router()
const checkAuth=require('../middleware/auth')
const task=require('../models/todo-schema')

router.post('/CreateTask',checkAuth,(req,res)=>{
    task.create(req.body).then((result)=>{ 
       res.send(result)
    })
})

router.get('/GetAllTasks',checkAuth,(req,res)=>{
    console.log(99999)
    task.find().then((result)=>{
        res.send(result)
    })
})

router.get('/GetTask/:id',checkAuth,(req,res)=>{
    task.findById({_id:req.params.id}).then((result)=>{
        res.send(result)
    })
})

router.put('/UpdateTask/:id',checkAuth,(req,res)=>{
    console.log(req.body)
    task.updateOne({_id:req.params.id},req.body).then((result)=>{

        res.send(result)
    })
})
router.delete("/DeleteTask/:id",checkAuth,(req,res)=>{
    console.log(req.params.id)
    task.deleteOne({_id:req.params.id}).then((result)=>{
        console.log(result)
        res.send()
    })
})

module.exports=router