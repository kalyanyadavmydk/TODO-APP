import { Component, OnInit } from '@angular/core';
import { NgModel,NgForm } from "@angular/forms";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authservice:AuthService) { }

  ngOnInit(): void {
  }

  onLogIn(formdata:NgForm){
    this.authservice.logIn(formdata.value.email,formdata.value.password)
  }

}
