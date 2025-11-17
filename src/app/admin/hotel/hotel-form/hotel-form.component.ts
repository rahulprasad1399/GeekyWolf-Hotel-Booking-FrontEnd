import {
  Component,
  DestroyRef,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HotelService } from '../../services/hotel.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hotel-form',
  imports: [ReactiveFormsModule],
  templateUrl: './hotel-form.component.html',
  styleUrl: './hotel-form.component.scss',
})
export class HotelFormComponent implements OnInit {
  action = input.required<string>();
  hotelService = inject(HotelService);
  destroyRef = inject(DestroyRef);
  router = inject(Router);
  hotelId = signal('');

  activatedRoute = inject(ActivatedRoute);

  constructor(private toastr: ToastrService) {}

  // EDIT
  ngOnInit() {
    if (this.action() === 'Edit') {
      this.hotelId.set(this.activatedRoute.snapshot.paramMap.get('hotelId')!);
      this.hotelService.GetHotelById(this.hotelId()).subscribe({
        next: (res) => {
          this.form.patchValue({
            name: res.name,
            address: res.address,
            city: res.city,
            country: res.country,
            phoneNumber: res.phoneNumber,
          });
        },
        error: (err) => console.log(err),
      });
    }
  }

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
    address: new FormControl(''),
    city: new FormControl('', {
      validators: [Validators.required],
    }),
    country: new FormControl('', {
      validators: [Validators.required],
    }),
    phoneNumber: new FormControl('', {
      validators: [Validators.required, Validators.pattern(/^\d{10}$/)],
    }),
  });

  get IsNameValid() {
    return (
      this.form.controls.name.touched &&
      this.form.controls.name.invalid &&
      this.form.controls.name.dirty
    );
  }

  get IsCityValid() {
    return (
      this.form.controls.city.touched &&
      this.form.controls.city.invalid &&
      this.form.controls.city.dirty
    );
  }

  get IsCountryValid() {
    return (
      this.form.controls.country.touched &&
      this.form.controls.country.invalid &&
      this.form.controls.country.dirty
    );
  }

  get IsPhoneNumberValid() {
    return (
      this.form.controls.phoneNumber.touched &&
      this.form.controls.phoneNumber.invalid &&
      this.form.controls.phoneNumber.dirty
    );
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    if (this.action() === 'Add') {
      const subscription = this.hotelService
        .CreateHotel(this.form.value)
        .subscribe({
          next: (res) => {
            this.toastr.success('Hotel Successfully Added');
            setTimeout(() => {
              this.router.navigate(['admin-dashboard', 'hotels']);
            }, 500); // optional small delay
          },
          error: (err) => {
            this.toastr.error('Failed to Add Hotel');
            console.log(err);
          },
        });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }

    if (this.action() === 'Edit') {
      const subscription = this.hotelService
        .UpdateHotel(this.hotelId(), this.form.value)
        .subscribe({
          next: (res) => {
            this.toastr.success('Hotel Successfully Updated');
            setTimeout(() => {
              this.router.navigate(['admin-dashboard', 'hotels']);
            }, 500); 
          },
          error: (err) => {
            this.toastr.error('Failed to Update Hotel');
            console.log(err);
          },
        });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }
}
