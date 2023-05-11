import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { Router } from '@angular/router';
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
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['firstName','lastName', 'email', 'gender', 'mobileNumber','city','actions'];
  dataSource = new MatTableDataSource<userList>(userData);
  editedRow: any;
  // formData: any[] = [];
  constructor(private userService:UserService,public dialog: MatDialog,private router:Router) { 
    this.dataSource = new MatTableDataSource(this.userService.formData);
  }

  ngOnInit(): void {
    // this.formData = this.userService.formData
    // this.dataSource = new MatTableDataSource(this.userService.formData);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onAdd(){
    this.router.navigate(['/register']);
  }
  // editRow(index: number) {
  //   const row = this.dataSource.data[index];
  //   this.dataSource.data = [...this.dataSource.data];
  // }
  // editRow(row: any) {
  //   this.editedRow =  {...row};
  // }
  deleteRow(index: number) {
    this.dataSource.data.splice(index, 1);
    this.dataSource.data = [...this.dataSource.data];
  }
  // submitEdit() {
  //   const index = this.dataSource.data.findIndex(d => d === this.editedRow);
  //   this.dataSource.data[index] = this.editedRow;
  //   this.dataSource._updateChangeSubscription(); // update the table view
  //   this.editedRow = null; // clear the edited row
  // }
  openFormDialog(row: any) {
    const dialogRef = this.dialog.open(UserRegisterComponent, {
      width: '400px',
      data: { ...row },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.data.findIndex(r => r.firstName === result.id);
        if (index > -1) {
          this.dataSource.data[index] = { ...result };
          this.dataSource._updateChangeSubscription();
        }
      }
    });
      
    }
  }

