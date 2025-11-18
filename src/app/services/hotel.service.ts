import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Hotel } from '../model/model.component';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  http = inject(HttpClient);

  constructor() {}

  GetAllHotels(
    destination: string,
    checkin: string,
    checkout: string,
    price?: number
  ) {
    if (price) {
      return this.http.get<Hotel[]>(
        `https://localhost:7006/Hotel?destination=${
          destination ? destination : ''
        }&checkin=${checkin ? checkin : ''}&checkout=${
          checkout ? checkout : ''
        }&price=${price}`    
      );
    } else {
      return this.http.get<Hotel[]>(
        `https://localhost:7006/Hotel?destination=${
          destination ? destination : ''
        }&checkin=${checkin ? checkin : ''}&checkout=${
          checkout ? checkout : ''
        }`
      );
    }
  }
}
