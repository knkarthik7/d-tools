import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  currentUser:string;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.getCurrentUser()
  }
home(){
  this.router.navigate(['/home']);
}
register(){
  this.router.navigate(['/register']);
}
details(){
  this.router.navigate(['/table']);
}
logout(){
  this.router.navigate(['']);
}
getCurrentUser(): any {
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
}
}
