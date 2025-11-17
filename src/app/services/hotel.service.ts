import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Hotel } from '../model/model.component';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  http = inject(HttpClient)

  constructor() { }

  GetAllHotels(){
    return this.http.get<Hotel[]>("https://localhost:7006/Hotel")
  }
}
