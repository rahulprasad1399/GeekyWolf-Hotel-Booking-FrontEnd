import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, ɵInternalFormsSharedModule } from '@angular/forms';

@Component({
  selector: 'app-banner',
  imports: [RouterLink, ɵInternalFormsSharedModule, FormsModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  destination = signal<string>('');
  checkin = signal('');
  checkout = signal('');
  message = signal('')
  dateValidation = signal<true | false>(false);
  router = inject(Router);

  onApplyFilter() {
    const checkin = this.checkin();
    const checkout = this.checkout();

    if ((checkin && !checkout) || (!checkin && checkout)) {
      this.dateValidation.set(true);
      this.message.set("Please Enter both the check in and check out date")
      return;
    }

    if (checkin && checkout && new Date(checkout) <= new Date(checkin)) {
      this.dateValidation.set(true);
      this.message.set("checkout date should be greater than check in date")
      return;
    }

    this.dateValidation.set(false);

    this.router.navigate(['/hotel-list'], {
      queryParams: {
        destination: this.destination(),
        checkin,
        checkout,
      },
    });
  }
}
