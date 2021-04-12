import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private hc:HttpClient) { }

  createUser(userObj):Observable<any>{
    return this.hc.post("/user/register",userObj);
  }

  loginUser(userCredObj):Observable<any>{
    return this.hc.post("/user/login",userCredObj);
  }

  addActivity(userActObj):Observable<any>{
    return this.hc.post("/user/addactivity",userActObj)
  }

  getUserActivity(username):Observable<any>{
    return this.hc.get("/user/getuser/"+username);
  }

  deleteUserActivity(username):Observable<any>{
    return this.hc.delete("/user/deleteuser/"+username);
  }

  changePassword(obj):Observable<any>{
    return this.hc.post("/user/reset",obj);
  }
}
