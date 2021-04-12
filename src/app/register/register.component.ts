
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  file:File;
  
  constructor(private us:UserService,private rc:Router) { }

  ngOnInit(): void {
  }
   
  onSubmit(ref){
    let userObj=ref.value;
    
    
      
    this.us.createUser(userObj).subscribe(
      res=>{
        if(res["message"]=="user already exists"){
          alert("Username already exist choose another")
        }
        if(res["message"]=="user created"){
          alert("registration success")
          
          this.rc.navigateByUrl("/userschedule");
        }
      },
      err=>{
        alert("something went wrong");
        console.log(err)
      }
    )
  }

  signup(){
    this.rc.navigateByUrl("/userschedule")
  }
}
