import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { Booking } from '../../model/model.component';

@Component({
  selector: 'app-booking',
  imports: [RouterOutlet],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
})
export class BookingComponent {

}
