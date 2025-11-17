import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, inject, signal } from '@angular/core';
import { Hotel } from '../../model/model.component';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  http = inject(HttpClient);

  GetAllHotels() {
    return this.http.get<Hotel[]>('https://localhost:7006/Hotel');
  }

  GetHotelById(id: string) {
    return this.http.get<Hotel>(`https://localhost:7006/Hotel/${id}`);
  }

  CreateHotel(hotel: any) {
    return this.http.post('https://localhost:7006/Hotel', hotel);
  }

  UpdateHotel(id: string, hotel: any) {
    return this.http.put(`https://localhost:7006/Hotel/${id}`, hotel);
  }

  DeleteHotel(id : number) {
    return this.http.delete(`https://localhost:7006/Hotel/${id}`)
  }
}
