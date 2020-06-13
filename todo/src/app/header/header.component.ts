import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authservice:AuthService) { }
  tokenStatus:boolean=false
  token=null

ngOnInit(): void 
  {
    console.log(123)
    this.token=this.authservice.gettoken()
    if(this.token!=null){
      this.tokenStatus=true
    }
    this.authservice.getAuthStatusListner().subscribe((data)=>
    {
      console.log(data)
      this.tokenStatus=data
    })

  }
  
logOut()
  {
    this.authservice.onLogOut()
  }

}
