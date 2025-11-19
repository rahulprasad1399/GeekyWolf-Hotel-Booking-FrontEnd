import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Booking } from '../model/model.component';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  http = inject(HttpClient)

  CreateBooking(booking : Booking){
    return this.http.post("https://localhost:7006/api/Booking",booking,{withCredentials : true})
  }

  getBookedDates(roomId : number){
    return this.http.get<{roomNumber : string, status : number, bookings : {checkin : string, checkout : string}[]}>(`https://localhost:7006/api/BookedDates?RoomId=${roomId}`)
  }
}
