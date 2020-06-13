const mongoose=require('mongoose')
const eventschema=new mongoose.Schema({

    taskname:{
        type:String,
        default:'task'
    },
    priority:{
        type:Number,
        default:0
    },
    status:{
        type:String,
        default:"notstarted"
    },

    duedate:{
        type:Date,
        default: new Date()
    },
    type:{
        type:String,
        default:"personal"
     },
    description:{
        type:String
    }
},{timestamps:true})
const event=mongoose.model('event_data',eventschema);
module.exports=event;