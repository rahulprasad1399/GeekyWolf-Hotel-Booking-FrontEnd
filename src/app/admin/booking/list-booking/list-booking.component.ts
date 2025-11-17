import { Component, DestroyRef, inject, signal } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Booking, BookingStatus } from '../../../model/model.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-booking',
  imports: [DatePipe],
  templateUrl: './list-booking.component.html',
  styleUrl: './list-booking.component.scss',
})
export class ListBookingComponent {
  bookingService = inject(BookingService);
  destroyRef = inject(DestroyRef);

  bookingStatus = BookingStatus;

  bookings = signal<Booking[]>([]);

  getAllHotels() {
    const subscription = this.bookingService.GetAllBookings().subscribe({
      next: (data) => this.bookings.set(data),
      error: (err) => console.log(err),
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  ngOnInit() {
    this.getAllHotels();
  }
}
