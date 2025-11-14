import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http = inject(HttpClient)
  apiUrl = "https://localhost:7006"
  
  constructor() { }

  onLogin(email : string, password : string){
    return this.http.post(this.apiUrl+'/api/Employee/login',{
      email : email,
      password : password
    },{withCredentials : true})
  }
}
