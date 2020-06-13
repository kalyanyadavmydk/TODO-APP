import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { TasksService } from '../tasks/tasks.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(public http:HttpClient,public taskservice:TasksService ,private router:Router) { }

  private token;
  private authStatusListner=new Subject<boolean>()

  getStatusToken(){
    if(Number(localStorage.getItem('expiresIn'))>new Date().getTime())
    {
      return true
    }
    else
    {
      localStorage.removeItem('token')
      localStorage.removeItem('expiresIn')
      this.taskservice.onLogOut()
      this.authStatusListner.next(false)
      return false
    } 

  }

  gettoken(): any {
    if(Number(localStorage.getItem('expiresIn'))>new Date().getTime())
    {
      this.authStatusListner.next(true)
      return localStorage.getItem('token')
    }
    else
    {
      this.taskservice.onLogOut()
    }
  }

  getAuthStatusListner()
  {
    if(Number(localStorage.getItem('expiresIn'))>new Date().getTime())
    {
      this.authStatusListner.next(true)
      return this.authStatusListner.asObservable()
    }
    else
    {
      this.taskservice.onLogOut()
      return this.authStatusListner.asObservable()
    }
    

  }

  createUser(email,password)
  {
    const newUser={ email:email,password:password }
    this.http.post<any>('http://localhost:3000/api/user/signup',newUser).subscribe((data)=>{
      console.log(data)
    })
  }

  logIn(email,password)
  {
    const User={ email:email,password:password }
    this.http.post<any>('http://localhost:3000/api/user/login',User).subscribe((data)=>
    {
      if(data.token)
      {
      this.token=data.token
      var copiedDate = new Date().getTime()+3600000
      localStorage.setItem('token',this.token)
       localStorage.setItem('expiresIn',""+copiedDate)
      this.authStatusListner.next(true)
      this.router.navigate(['/'])
      }
    })
  }

  onLogOut()
  {
    this.token=null
    localStorage.removeItem('token')
    localStorage.removeItem('expiresIn')
    this.authStatusListner.next(false)
    this.taskservice.onLogOut()
    this.router.navigate(['/'])
  }

}
