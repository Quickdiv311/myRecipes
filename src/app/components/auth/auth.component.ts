import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AuthResponse } from './auth-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
   isLoginMode = true;
   isLoading = false;
   error = "";

   constructor(private authService: AuthService, private router: Router){}

   switchMode(){
     this.isLoginMode = !this.isLoginMode;
   }

   onSubmit(form: NgForm){
     let {email, password} = form.value;

     this.isLoading = true;

     let auth: Observable<AuthResponse>;

     if(this.isLoginMode)
      {
        auth = this.authService.signin(email,password);
      }
     else
     {
      auth = this.authService.signup(email,password);
    }

    auth.subscribe(res => {
                           this.isLoading = false;
                           this.router.navigate(['recipes']);
                           form.reset();
                          }, 
                  err =>  {
                          this.error = err;
                          this.isLoading = false;
                          });
   }
}
