import { Component, OnInit, inject, signal } from '@angular/core';
import { FilterComponent } from './filter/filter.component';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../model/model.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-hotel-list',
  imports: [FilterComponent, RouterLink],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.scss',
})
export class HotelListComponent implements OnInit {
  hotelService = inject(HotelService);
  activatedRoute = inject(ActivatedRoute);

  hotelList = signal<Hotel[]>([]);

  destination = signal('');
  checkin = signal('');
  checkout = signal('');
  price = signal(0);
  sortBy = signal('');

  ngOnInit() {
    this.activatedRoute.queryParams
      .pipe(
        switchMap((params) => {
          this.destination.set(params['destination'] || '');
          this.checkin.set(params['checkin'] || '');
          this.checkout.set(params['checkout'] || '');
          this.price.set(Number(params['price']) || 0);

          return this.hotelService.GetAllHotels(
            this.destination(),
            this.checkin(),
            this.checkout(),
            this.price()
          );
        })
      )
      .subscribe({
        next: (res) => {
          this.hotelList.set(res);
        },
        error: (err) => console.log(err),
      });
  }

  getFeedback(rating: number): string {
    if (rating >= 9) return 'Excellent';
    if (rating >= 7) return 'Very Good';
    if (rating >= 5) return 'Good';
    if (rating >= 3) return 'Poor';   
    return 'Very Poor';    
  }

  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.sortBy.set(value);
    this.sortHotels();
  }

  sortHotels() {
    const sorted = [...this.hotelList()];
    if (this.sortBy() === 'price') {
      sorted.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (this.sortBy() === 'rating') {
      sorted.sort((a, b) => b.customerRating - a.customerRating);
    }
    this.hotelList.set(sorted);
  }
}
