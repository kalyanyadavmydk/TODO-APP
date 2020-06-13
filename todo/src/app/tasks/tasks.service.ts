import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks=[]
  tasksUpdated = new Subject();
  constructor(public http:HttpClient) { }

  createTask(form)
  {
      this.http.post<any>('http://localhost:3000/api/CreateTask',form).subscribe((data)=>{
      this.tasks.push(data)
      this.tasksUpdated.next([...this.tasks])
    })
  }
  getUpdatedTasks()
  {
    return this.tasksUpdated.asObservable()
  }
  getAllTasks()
  {
      this.http.get<any>('http://localhost:3000/api/GetAllTasks').subscribe((data)=>{
      this.tasks=data
      this.tasksUpdated.next([...this.tasks])
    })
  }

  getTask(id:string)
  {
   
    return this.http.get<any>('http://localhost:3000/api/GetTask/'+id)
  }

  updateTask(id,task)
  {
    
      this.http.put<any>('http://localhost:3000/api/UpdateTask/'+id,task).subscribe((data)=>{
      const updatedTasks=[...this.tasks]
      const oldIndex=updatedTasks.findIndex(task=>task._id===id)
      updatedTasks[oldIndex]=task
      this.tasks=updatedTasks
      this.tasksUpdated.next([...this.tasks])
    
    })
  }

  deleteTaskById(id)
  {
      this.http.delete('http://localhost:3000/api/DeleteTask/'+id).subscribe((data)=>{
      const updatedTasks=this.tasks.filter(task=>task._id!=id)
      this.tasks=updatedTasks
      this.tasksUpdated.next([...this.tasks])
    })
  }

  onLogOut()
  {
    this.tasksUpdated.next([])
  }


}
