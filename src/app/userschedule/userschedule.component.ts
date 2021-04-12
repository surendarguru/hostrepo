import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-userschedule',
  templateUrl: './userschedule.component.html',
  styleUrls: ['./userschedule.component.css']
})
export class UserscheduleComponent implements OnInit {

  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(formRef){

    let userCredObj=formRef.value;
    
   
      this.us.loginUser(userCredObj).subscribe(
        res=>{
          if(res["message"]==["success"]){
            localStorage.setItem("token",res["signedToken"])
            localStorage.setItem("username",res["username"])

            this.router.navigateByUrl("/userdashboard");
          }
          else{
            alert(res["message"])
          }
          

        },
        err=>{
          alert("Something went wrong in user login")
          console.log(err)
        }
      )


     
  }
}






