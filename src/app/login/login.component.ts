import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginMode:boolean = true;
  error:string = null;
  constructor(private fb: FormBuilder,private authService:AuthServiceService,private router:Router) { }
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });
  ngOnInit(): void {
  }
  signup(){
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(loginForm:any) {
    if(!loginForm){
      return;
    }
    if(this.isLoginMode){
      this.authService.login(loginForm.value.email,loginForm.value.password).subscribe(response => {
        console.log(response);

        this.router.navigate(['/home']);
      }, error => {
        console.log(error);
        this.error = error.error.error.message;
      })
    }else{
    this.authService.signUp(loginForm.value.email,loginForm.value.password).subscribe(response => {
      console.log(response)
      this.loginForm.reset();
    }, error => {
      console.log(error);
      this.error = error.error.error.message;
    })
  }
  }
}
