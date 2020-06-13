import { Component, OnInit } from '@angular/core';
import { NgForm,NgModel } from "@angular/forms";

import { TasksService } from '../tasks.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})

export class CreateTaskComponent implements OnInit {
 
  mode="create"
  taskid:string
  task
  constructor( public taskservice:TasksService, public route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((parammap:ParamMap)=>{
      if(parammap.has('taskId')){
        this.mode="edit"
        this.taskid=parammap.get('taskId')
        this.taskservice.getTask(this.taskid).subscribe((data)=>{
        this.task=data
        })
      }
      else
      {
        this.mode="create"
        this.taskid=null;
      }
    })
  }

  

  addTask(formdata:NgForm){
    
    if(formdata.invalid) return alert("fill all details")
    
    alert("Task Added successfully")
  
    console.log(formdata.value)
    if(this.mode==="create")
    {
      const task={
        taskname:formdata.value.taskname,
        description:formdata.value.description,
        type:formdata.value.type,
        duedate:formdata.value.duedate
      }
    this.taskservice.createTask(task)
    }
    else
    {
      const task={
        _id:this.taskid,
        taskname:formdata.value.taskname,
        description:formdata.value.description,
        type:formdata.value.type,
        duedate:formdata.value.duedate
      }
      this.taskservice.updateTask(this.taskid,task)
    }
  }

}
