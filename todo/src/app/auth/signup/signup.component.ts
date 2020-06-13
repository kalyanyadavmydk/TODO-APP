import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authservice:AuthService) { }

  ngOnInit(): void 
  {
    
  }

  onSignUp(formdata:NgForm)
  {
    
    this.authservice.createUser(formdata.value.email,formdata.value.password)
  }

}
