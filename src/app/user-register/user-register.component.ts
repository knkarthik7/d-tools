import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registrationForm: FormGroup;
  rowData:any;
  editData : boolean;
  constructor(private fb: FormBuilder, private userService:UserService,private router:Router) { }
  genders:any = ['Male','Female']
  ngOnInit(): void {
    if(!this.editData){
    this.registrationForm = this.fb.group({
      firstName:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],
      lastName:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],
      email: ['',[Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),Validators.required]],
      mobileNumber:['',[Validators.pattern('^[0-9]{10}$'),Validators.required]],
      gender:[''],
      city:['',[Validators.required]],
  });
}
  // this.userService.getClearFieldsSubject().subscribe(() => {
  //   this.registrationForm.reset()
  // })
  if(this.editData){
    this.rowData = this.userService.formData;
  console.log(this.rowData,'rowData')
  }
  
  }
  onSubmit(){
    // this.userService.formData = [];
this.userService.addFormData(this.registrationForm.value);
this.router.navigate(['/userList']);
  }
  onCancel(){
    this.userService.addFormData(this.registrationForm.value);
    this.router.navigate(['/userList']); 
  }
}
