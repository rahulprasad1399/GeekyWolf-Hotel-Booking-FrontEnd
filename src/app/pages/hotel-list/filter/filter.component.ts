import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../../../services/hotel.service';

@Component({
  selector: 'app-filter',
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  message = signal('');
  dateValidation = signal<true | false>(false);

  destination = signal('');
  checkin = signal('');
  checkout = signal('');
  price = signal(0);
  changeSearch = signal(false);

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.destination.set(params['destination'] || '');
      this.checkin.set(params['checkin'] || '');
      this.checkout.set(params['checkout'] || '');
      this.price.set(Number(params['price']) || 0);
    });
  }

  onChangeSearch() {
    this.changeSearch.update((prev) => !prev);
  }

  onApplyFilter() {
    const checkin = this.checkin();
    const checkout = this.checkout();

    if ((checkin && !checkout) || (!checkin && checkout)) {
      this.dateValidation.set(true);
      this.message.set('Please Enter both the check in and check out date');
      return;
    }

    if (checkin && checkout && new Date(checkout) <= new Date(checkin)) {
      this.dateValidation.set(true);
      this.message.set('checkout date should be greater than check in date');
      return;
    }

    this.dateValidation.set(false);

    this.router.navigate([], {
      queryParams: {
        destination: this.destination(),
        checkin,
        checkout,
        price: this.price(),
      },
    });

    this.changeSearch.set(false);
  }
}
