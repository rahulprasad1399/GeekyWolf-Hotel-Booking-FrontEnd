import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { ToastrService } from 'ngx-toastr';
import { Room, RoomStatus } from '../../../model/model.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-list-room',
  imports: [RouterLink],
  templateUrl: './list-room.component.html',
  styleUrl: './list-room.component.scss',
})
export class ListRoomComponent {
  roomService = inject(RoomService);
  destroyRef = inject(DestroyRef);

  constructor(private toastr: ToastrService) {}

  rooms = signal<Room[]>([]);
  modalIsOpen = signal(false);
  dataIdToDelete = signal<number>(0);
  roomStatus = RoomStatus

  getAllRooms() {
    const subscription = this.roomService.GetAllRooms().subscribe({
      next: (data) => this.rooms.set(data),
      error: (err) => console.log(err),
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  ngOnInit() {
    this.getAllRooms();
  }

  onDelete(id: number) {
    this.modalIsOpen.set(true);
    this.dataIdToDelete.set(id);
  }

  onCancel() {
    this.modalIsOpen.set(false);
    this.dataIdToDelete.set(0);
  }

  onConfirm() {
    this.roomService.DeleteRoom(this.dataIdToDelete()).subscribe({
      next: (res) => {
        this.modalIsOpen.set(false);
        this.dataIdToDelete.set(0);
        this.toastr.success('Room Deleted Successfully');
        this.getAllRooms();
      },
      error: (err) => {
        this.modalIsOpen.set(false);
        this.dataIdToDelete.set(0);
        this.toastr.error('Failed to delete Room');
      },
    });
  }
}
