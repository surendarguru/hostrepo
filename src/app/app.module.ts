import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { UserscheduleComponent } from './userschedule/userschedule.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { from } from 'rxjs';
import {FormsModule} from '@angular/forms';
import { ResetComponent } from './reset/reset.component'
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    UserscheduleComponent,
    UserdashboardComponent,
    ResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
