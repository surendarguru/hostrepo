import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { UserscheduleComponent } from './userschedule/userschedule.component';

const routes: Routes = [
  {path:"register",component:RegisterComponent},
  {path:"userschedule",component:UserscheduleComponent},
  {path:"userdashboard",component:UserdashboardComponent},
  {path:"reset",component:ResetComponent},
  {path:"",redirectTo:"/register",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
