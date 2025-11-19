import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Room, RoomStatus } from '../../model/model.component';
import { RoomService } from '../../services/room.service';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { ToastrService } from 'ngx-toastr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-hotel-details',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.scss',
})
export class HotelDetailsComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  roomService = inject(RoomService);
  destroyRef = inject(DestroyRef);
  roomStatus = RoomStatus;
  bookingService = inject(BookingService);
  router = inject(Router);

  message = signal<string>('');

  bookingRanges = signal<{ checkin: Date; checkout: Date }[]>([]);

  constructor(private toastr: ToastrService) {}

  hotelId = signal<number>(0);
  isBookNow = signal(false);
  selectedRoom = signal<Room | null>(null);

  rooms = signal<Room[]>([]);

  ngOnInit() {
    this.hotelId.set(+this.activatedRoute.snapshot.paramMap.get('id')!);
    this.roomService.getRoomByHotelId(this.hotelId()).subscribe({
      next: (res) => this.rooms.set(res),
      error: (err) => console.log(err),
    });
  }

  onBookNow(room: Room) {
    this.selectedRoom.set(room);
    this.isBookNow.set(true);

    this.bookingService.getBookedDates(room.id).subscribe({
      next: (res) => {
        this.bookingRanges.set(
          res.bookings.map((b) => ({
            checkin: new Date(b.checkin),
            checkout: new Date(b.checkout),
          }))
        );
      },
      error: (err) => console.log(err),
    });
  }

  onCancel() {
    this.isBookNow.set(false);
  }

  form = new FormGroup({
    checkInDate: new FormControl('', {
      validators: [Validators.required],
    }),
    checkOutDate: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    if (this.form.invalid || !this.selectedRoom()) return;

    const enteredCheckIn = this.form.value.checkInDate!;
    const enteredCheckOut = this.form.value.checkOutDate!;

    if (enteredCheckIn > enteredCheckOut) {
      this.message.set('check out date should be greater than check in date');
      return;
    }

    const overlapBooking = this.bookingRanges().filter(
      (booking) =>
        new Date(enteredCheckIn) < new Date(booking.checkout) &&
        new Date(enteredCheckOut) < new Date(booking.checkin)
    );

    if (overlapBooking) {
      this.message.set('Enter a valid date');
      return;
    }

    const room = this.selectedRoom()!;

    const totalAmount = room.pricePerNight;
    const status = 0;
    const roomId = room.id;

    const bookingData = {
      checkInDate: enteredCheckIn,
      checkOutDate: enteredCheckOut,
      totalAmount,
      status,
      roomId,
    };

    this.bookingService.CreateBooking(bookingData).subscribe({
      next: (res) => {
        this.toastr.success('Booking Successfull');
        this.isBookNow.set(false);
        this.message.set('');
      },
      error: (err) => {
        this.toastr.error('Booking Failed Please Login');
        this.router.navigate(['customer-register']);
        this.isBookNow.set(false);
        this.message.set('');
      },
    });
  }

  checkInFilter = (date: Date | null): boolean => {
    if (!date) return true;
    if (date < new Date()) return false;
    return !this.bookingRanges().some(
      (range) => date >= range.checkin && date <= range.checkout
    );
  };

  checkOutFilter = (date: Date | null): boolean => {
    if (!date) return true;
    if (date < new Date()) return false;
    return !this.bookingRanges().some(
      (range) => date >= range.checkin && date <= range.checkout
    );
  };
}
