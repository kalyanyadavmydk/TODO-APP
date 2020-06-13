import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css']
})
export class ListTasksComponent implements OnInit {

  constructor(public taskservice:TasksService) { }
  tasks:any=[]
  ngOnInit()
  {
   
    this.taskservice.getAllTasks()
    this.taskservice.getUpdatedTasks().subscribe((data)=>{
    this.tasks=data;
    })
  }

  deleteTask(id)
  {
    this.taskservice.deleteTaskById(id)
  }

}
