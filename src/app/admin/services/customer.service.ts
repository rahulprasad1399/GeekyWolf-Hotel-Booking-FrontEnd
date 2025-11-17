import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Customer } from '../../model/model.component';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http = inject(HttpClient);

  GetAllCustomers() {
    return this.http.get<Customer[]>('https://localhost:7006/Customer');
  }
}
