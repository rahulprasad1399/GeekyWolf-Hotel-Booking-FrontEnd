import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../../model/model.component';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-hotel',
  imports: [RouterLink],
  templateUrl: './list-hotel.component.html',
  styleUrl: './list-hotel.component.scss',
})
export class ListHotelComponent implements OnInit {
  hotelService = inject(HotelService);
  destroyRef = inject(DestroyRef);

  constructor(private toastr: ToastrService) {}

  hotels = signal<Hotel[]>([]);
  modalIsOpen = signal(false);
  dataIdToDelete = signal<number>(0);

  getAllHotels() {
    const subscription = this.hotelService.GetAllHotels().subscribe({
      next: (data) => this.hotels.set(data),
      error: (err) => console.log(err),
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  ngOnInit() {
    this.getAllHotels();
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
    this.hotelService.DeleteHotel(this.dataIdToDelete()).subscribe({
      next: (res) => {
        this.modalIsOpen.set(false);
        this.dataIdToDelete.set(0);
        this.toastr.success('Hotel Deleted Successfully');
        this.getAllHotels();
      },
      error: (err) => {
        this.modalIsOpen.set(false);
        this.dataIdToDelete.set(0);
        this.toastr.error('Failed to delete Hotel');
      },
    });
  }
}
