import { Component,OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewProductComponent } from '../new-product/new-product.component';
import { UserRegisterComponent } from '../user-register/user-register.component';
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
  rowData :any;
  constructor(private userService:UserService,public dialog: MatDialog,private router:Router) { 
    this.dataSource = new MatTableDataSource(this.userService.formData);
    
  }

  ngOnInit(): void {
    this.rowData = this.dataSource.filteredData[0];
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
      // this.dataSource.data.splice(item, 1);
      // this.dataSource.data = [...this.dataSource.data];
      // this.router.navigate(['/register']);
    
    }
    onClear(item:any){
      // this.router.navigate(['/register']);
      // this.rowData = this.userService.formData;
      // console.log(this.rowData,'dataSource')
      // // const items = new MatTableDataSource(this.userService.formData);
      // this.userService.formData = []
      // const previous = [...this.userService.formData];
      
      // // this.dataSource.data = [...this.dataSource.data];
      // console.log(previous,'previous');
      // // this.dataSource;
      // // console.log(this.dataSource,'dataSource')
      // // this.rowData;
      // // console.log(this.rowData,'list');
      item.isEdit = false;
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
  
    onAddUser(){
      // this.userForm.registrationForm.reset()
      // this.userService.clearFormFields();
      this.router.navigate(['/register']);
      // this.userService.clearFormData();
    }
}
