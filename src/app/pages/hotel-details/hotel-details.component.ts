import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room, RoomStatus } from '../../model/model.component';
import { RoomService } from '../../services/room.service';
import { EMPTY, switchMap } from 'rxjs';

@Component({
  selector: 'app-hotel-details',
  imports: [],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.scss',
})
export class HotelDetailsComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  roomService = inject(RoomService);
  destroyRef = inject(DestroyRef);
  roomStatus = RoomStatus;

  hotelId = signal<number>(0);

  rooms = signal<Room[]>([]);

  ngOnInit() {
    this.hotelId.set(+this.activatedRoute.snapshot.paramMap.get('id')!);
    this.roomService.getRoomByHotelId(this.hotelId()).subscribe({
      next: (res) => this.rooms.set(res),
      error: (err) => console.log(err),
    });
  }
}
