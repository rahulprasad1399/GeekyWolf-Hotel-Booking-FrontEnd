import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Room } from '../model/model.component';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  http = inject(HttpClient)

  getRoomByHotelId(id : number){
    return this.http.get<Room[]>(`https://localhost:7006/api/Room?hotelId=${id}`)
  }
}
