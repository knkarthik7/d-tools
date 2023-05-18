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
  errorMsg:string = null;
  constructor(private fb: FormBuilder,private authService:AuthServiceService,private router:Router) { }
  loginForm = this.fb.group({
    email: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  ngOnInit(): void {
  }
  onSubmit(loginForm:any) {
      this.authService.login(loginForm.value.email,loginForm.value.password).subscribe(response => {
        console.log(response);
        this.router.navigate(['/home']);
      }, error => {
        let errorMsg = 'An unknown error occurred.'; 
        console.log(error.error.error.message);
        if(error.error.error.message === 'EMAIL_NOT_FOUND'){
          errorMsg = 'User Not Found';
        } else if(error.error.error.message === 'INVALID_PASSWORD'){
          errorMsg = 'Invalid Password';
        }
        this.errorMsg =errorMsg;
      }); 
  }
}
