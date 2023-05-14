import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  formData: any[] = [];
  constructor() { }
  
  addFormData(data: any) {
    this.formData.push(data);
  }
}
