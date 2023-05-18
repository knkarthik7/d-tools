import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  formData: any[] = [];
  constructor() { }
  private clearFieldsSubject = new Subject<void>();
  addFormData(data: any) {
    this.formData.push(data);
  }
  clearFormFields() {
    this.clearFieldsSubject.next();
  }
  getClearFieldsSubject() {
    return this.clearFieldsSubject.asObservable();
  }
}
