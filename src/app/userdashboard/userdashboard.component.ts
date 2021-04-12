import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {
  username;
  object;
  user;
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
    this.username=localStorage.getItem("username");
  }
  userLogout(){
    localStorage.clear();
    this.router.navigateByUrl("/userschedule");
  }
  onSubmit(formRef){
    this.username=localStorage.getItem("username");
    let userObj=formRef.value;
    userObj.username=this.username;
    console.log(userObj)
    this.us.addActivity(userObj).subscribe(
      res=>{
        if(res["message"]=="activity added successfully"){
          alert("Activity added");
          this.view();
        }
      },
      err=>{
        alert("something went wrong")
        console.log(err);
      }
    )
  }

  view(){
    this.us.getUserActivity(this.username).subscribe(
      res=>{
        this.object= res["message"];
      },
      err=>{
        alert("something went wrong in displaying activity")
        console.log("err is",err);
      }
    )
    
  }
  onDelete(){
    this.username=localStorage.getItem("username");
    this.us.deleteUserActivity(this.username).subscribe(
      res=>{
        if(res["message"]=="removed successfully"){
          alert("activity deleted")
        }
      },
      err=>{
        alert("something went wrong")
        console.log(err);
      }
    )
   
  }
}
