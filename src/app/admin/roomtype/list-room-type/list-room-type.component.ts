import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { RoomTypeService } from '../../services/room-type.service';
import { ToastrService } from 'ngx-toastr';
import { RoomType } from '../../../model/model.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-list-room-type',
  imports: [RouterLink],
  templateUrl: './list-room-type.component.html',
  styleUrl: './list-room-type.component.scss',
})
export class ListRoomTypeComponent {

  action = input.required<string>()

  roomTypeService = inject(RoomTypeService);
  destroyRef = inject(DestroyRef);

  constructor(private toastr: ToastrService) {}

  roomTypes = signal<RoomType[]>([]);
  modalIsOpen = signal(false);
  dataIdToDelete = signal<number>(0);

  getAllRoomTypes() {
    const subscription = this.roomTypeService.GetAllRoomType().subscribe({
      next: (data) => this.roomTypes.set(data),
      error: (err) => console.log(err),
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  ngOnInit() {
    this.getAllRoomTypes();
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
    this.roomTypeService.DeleteRoomType(this.dataIdToDelete()).subscribe({
      next: (res) => {
        this.modalIsOpen.set(false);
        this.dataIdToDelete.set(0);
        this.toastr.success('RoomType Deleted Successfully');
        this.getAllRoomTypes();
      },
      error: (err) => {
        this.modalIsOpen.set(false);
        this.dataIdToDelete.set(0);
        this.toastr.error('Failed to delete RoomType');
      },
    });
  }
}
