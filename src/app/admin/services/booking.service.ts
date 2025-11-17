import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Booking } from '../../model/model.component';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  http = inject(HttpClient);

  GetAllBookings() {
    return this.http.get<Booking[]>('https://localhost:7006/api/Booking');
  }
}
