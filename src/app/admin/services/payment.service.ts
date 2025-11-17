import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Payment } from '../../model/model.component';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  http = inject(HttpClient);

  GetAllPayments() {
    return this.http.get<Payment[]>('https://localhost:7006/api/Payment');
  }
}
