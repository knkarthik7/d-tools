import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registrationForm: FormGroup;
  constructor(private fb: FormBuilder, private http:HttpClient, private userService:UserService,private router:Router) { }
  genders:any = ['male','female']
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],
      lastName:['',[Validators.required,Validators.pattern('[a-zA-Z]+')]],
      email: ['',[Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),Validators.required]],
      mobileNumber:['',[Validators.pattern('^[0-9]{10}$'),Validators.required]],
      gender:[''],
      city:['',[Validators.required]],
  });
  }
  onSubmit(){
    // const postDate = this.registrationForm.value;
    // this.http.post('https://firstapp-abf7c-default-rtdb.firebaseio.com/posts.json',postDate).subscribe(response => {
    //   console.log(response)
    // })
this.userService.addFormData(this.registrationForm.value)
this.router.navigate(['/table']);
  }
  // getData(){
  //   this.http.get('https://firstapp-abf7c-default-rtdb.firebaseio.com/posts.json')
  //   .pipe(map((response) => {
  //     let data:any = [];
  //     for(let key in response){
  //       data.push(response[key])
  //     }
  //     return data;
  //   }))
  //   .subscribe(response => {
  //     console.log(response)
  //   })
  // }
}
