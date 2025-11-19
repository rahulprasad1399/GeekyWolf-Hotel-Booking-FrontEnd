import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CreateCustomer, LoginCustomer } from '../model/model.component';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http = inject(HttpClient)

  RegisterCustomer(customer : CreateCustomer){
    return this.http.post("https://localhost:7006/Customer", customer)
  }

  LoginCustomer(data : LoginCustomer){
    return this.http.post("https://localhost:7006/Customer/login", data)
  }
}
