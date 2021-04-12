import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(formRef){

    let userCredObj=formRef.value;
   
    if(userCredObj.password1==userCredObj.password2)
    {
     
      this.us.changePassword(userCredObj).subscribe(
        res=>{
          if(res["message"]==["success"])
          {
            this.router.navigateByUrl("/userschedule")
          }
        },
        err=>{
          console.log(err)
        }
      )
    } 
    else
    {
      alert("passwords not same")
    }
   
  }
}
