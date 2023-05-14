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
  error:string = null;
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
        console.log(error);
        switch(error.error.error.message){
          case 'EMAIL_NOT_FOUND':
          this.error = 'User Not Found';
          break;
          case 'INVALID_PASSWORD':
            this.error = 'Invalid Password';
            break;
        }
        this.error = error.error.error.message;
      }); 
  }
}
