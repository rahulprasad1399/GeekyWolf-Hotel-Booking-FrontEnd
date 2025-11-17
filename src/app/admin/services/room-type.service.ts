import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RoomType } from '../../model/model.component';

@Injectable({
  providedIn: 'root',
})
export class RoomTypeService {
  http = inject(HttpClient);

  GetAllRoomType() {
    return this.http.get<RoomType[]>('https://localhost:7006/RoomType');
  }

  GetRoomTypeById(id: string) {
    return this.http.get<RoomType>(`https://localhost:7006/RoomType/${id}`);
  }

  CreateRoomType(RoomType: any) {
    return this.http.post('https://localhost:7006/RoomType', RoomType);
  }

  UpdateRoomType(id: string, roomType: any) {
    return this.http.put(`https://localhost:7006/RoomType/${id}`, roomType);
  }

  DeleteRoomType(id: number) {
    return this.http.delete(`https://localhost:7006/RoomType/${id}`);
  }
}
