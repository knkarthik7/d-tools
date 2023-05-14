import { Component,OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewProductComponent } from '../new-product/new-product.component';
export interface userList {
  firstName:string;
  lastName: string;
  email: string;
  gender: string;
  mobileNumber:number;
  city:string;
  }
  const userData: userList[] =  [];

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['firstName','lastName', 'email', 'gender', 'mobileNumber','city','actions'];
  dataSource = new MatTableDataSource<userList>(userData);
  editedRow: any;
  constructor(private userService:UserService,public dialog: MatDialog,private router:Router) { 
    this.dataSource = new MatTableDataSource(this.userService.formData);
  }

  ngOnInit(): void {
  }
  applySearch(event: Event) {
    const SearchValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = SearchValue.trim().toLowerCase();
  }
  onAdd(){
    this.router.navigate(['/register']);
  }
  deleteRow(index: number) {
    if(confirm("Are you sure to delete ")){
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = [...this.dataSource.data];
    } 
  }
    onEdit(item:any){
      item.isEdit = true;
    }
    onUpdate(item:any){
      this.dataSource._updateChangeSubscription();
      item.isEdit = false;
    }
    addProduct(){
      this.dialog.open(NewProductComponent,{
        width: '650px',
        height:'600px'
      })
    }
    onClear(item:any){
      item.isEdit = false
    }
    onAddUser(){
      this.router.navigate(['/register']);
    }
}
