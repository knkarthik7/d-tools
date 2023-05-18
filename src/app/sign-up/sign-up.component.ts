import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  error:string = null;
  successMessage:string = null;
  showAlert = false;
  constructor(private fb: FormBuilder,private authService:AuthServiceService,private router:Router) { }
  signUpForm = this.fb.group({
    email: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  ngOnInit(): void {
  }
  onSubmit(signUpForm:any) {
    this.authService.signUp(signUpForm.value.email,signUpForm.value.password).subscribe(response => {
      console.log(response);
      this.showAlert = true;
      this.successMessage = 'Sign Up sucessfully';
      this.signUpForm.reset();
      setTimeout(() => {
        this.showAlert = false
       }, 2000);
    }, error => {
      console.log(error);
      this.error = error.error.error.message;
    })
  
  }
}
