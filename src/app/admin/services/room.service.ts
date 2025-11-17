import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Room } from '../../model/model.component';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  http = inject(HttpClient);

  GetAllRooms() {
    return this.http.get<Room[]>('https://localhost:7006/api/Room');
  }

  GetRoomById(id: string) {
    return this.http.get<Room>(`https://localhost:7006/api/Room/${id}`);
  }

  CreateRoom(room: any) {
    return this.http.post('https://localhost:7006/api/Room', room);
  }

  UpdateRoom(id: string, room: any) {
    return this.http.put(`https://localhost:7006/api/Room/${id}`, room);
  }

  DeleteRoom(id: number) {
    return this.http.delete(`https://localhost:7006/api/Room/${id}`);
  }
}
