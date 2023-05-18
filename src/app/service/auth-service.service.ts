import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponseData {
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registered? : boolean;
}
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }
  signUp(email:string,password:string){
return this.http.post<AuthResponseData> (`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBccm4o4JQNE90QfWOp6RbJCgO8t3F94Ng`,
{email,password,returnSecureToken:true});
  }
  login(email:string,password:string){
    localStorage.setItem('currentUser', JSON.stringify(email));
    return this.http.post<AuthResponseData> (`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBccm4o4JQNE90QfWOp6RbJCgO8t3F94Ng`,
    {email,password,returnSecureToken:true});
    
  }
}
