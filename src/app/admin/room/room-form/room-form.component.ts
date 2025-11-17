import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Hotel, RoomType } from '../../../model/model.component';
import { HotelService } from '../../services/hotel.service';
import { RoomTypeService } from '../../services/room-type.service';

@Component({
  selector: 'app-room-form',
  imports: [ReactiveFormsModule],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.scss',
})
export class RoomFormComponent {
  action = input.required<string>();

  roomService = inject(RoomService);
  hotelService = inject(HotelService);
  roomTypeService = inject(RoomTypeService);

  destroyRef = inject(DestroyRef);
  router = inject(Router);
  roomId = signal('');

  hotels = signal<Hotel[]>([]);
  roomType = signal<RoomType[]>([]);

  activatedRoute = inject(ActivatedRoute);

  constructor(private toastr: ToastrService) {}

  // EDIT
  ngOnInit() {
    if (this.action() === 'Edit') {
      this.roomId.set(this.activatedRoute.snapshot.paramMap.get('roomId')!);
      this.roomService.GetRoomById(this.roomId()).subscribe({
        next: (res) => {
          this.form.patchValue({
            roomNumber: res.roomNumber,
            pricePerNight: Number(res.pricePerNight),
            roomStatus: Number(res.roomStatus),
            hotelId: Number(res.hotelId),
            roomTypeId: Number(res.roomTypeId),
          });
        },
        error: (err) => console.log(err),
      });
    }

    const getAllHotelsSubscription = this.hotelService
      .GetAllHotels()
      .subscribe({
        next: (res) => this.hotels.set(res),
        error: (err) => console.log(err),
      });

    this.destroyRef.onDestroy(() => {
      getAllHotelsSubscription.unsubscribe();
    });

    const getAllRoomTypesSubscription = this.roomTypeService
      .GetAllRoomType()
      .subscribe({
        next: (res) => this.roomType.set(res),
        error: (err) => console.log(err),
      });

    this.destroyRef.onDestroy(() => {
      getAllRoomTypesSubscription.unsubscribe();
    });
  }

  form = new FormGroup({
    roomNumber: new FormControl('', {
      validators: [Validators.required],
    }),
    pricePerNight: new FormControl(0, {
      validators: [Validators.required],
    }),
    roomStatus: new FormControl(0, {
      validators: [Validators.required],
    }),
    hotelId: new FormControl(0, {
      validators: [Validators.required],
    }),
    roomTypeId: new FormControl(0, {
      validators: [Validators.required],
    }),
  });

  get IsRoomNumberValid() {
    return (
      this.form.controls.roomNumber.touched &&
      this.form.controls.roomNumber.invalid &&
      this.form.controls.roomNumber.dirty
    );
  }

  get IsPricePerNightValid() {
    return (
      this.form.controls.pricePerNight.touched &&
      this.form.controls.pricePerNight.invalid &&
      this.form.controls.pricePerNight.dirty
    );
  }

  get IsRoomStatusValid() {
    return (
      this.form.controls.roomStatus.touched &&
      this.form.controls.roomStatus.invalid &&
      this.form.controls.roomStatus.dirty
    );
  }

  get IsHotelIdValid() {
    return (
      this.form.controls.hotelId.touched &&
      this.form.controls.hotelId.invalid &&
      this.form.controls.hotelId.dirty
    );
  }

  get IsRoomTypeIdValid() {
    return (
      this.form.controls.roomTypeId.touched &&
      this.form.controls.roomTypeId.invalid &&
      this.form.controls.roomTypeId.dirty
    );
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const enteredRoomNumber = this.form.value.roomNumber;
    const enteredPricePerNight = Number(this.form.value.pricePerNight);
    const enteredRoomStatus = Number(this.form.value.roomStatus);
    const enteredHotelId = Number(this.form.value.hotelId);
    const enteredRoomTypeId = Number(this.form.value.roomTypeId);

    if (this.action() === 'Add') {
      const subscription = this.roomService
        .CreateRoom({
          roomNumber: enteredRoomNumber,
          pricePerNight: enteredPricePerNight,
          status: enteredRoomStatus,
          hotelId: enteredHotelId,
          roomTypeId: enteredRoomTypeId,
        })
        .subscribe({
          next: (res) => {
            this.toastr.success('Room Successfully Added');
            setTimeout(() => {
              this.router.navigate(['admin-dashboard', 'rooms']);
            }, 500);
          },
          error: (err) => {
            this.toastr.error('Failed to Add Room');
            console.log(err);
          },
        });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }

    if (this.action() === 'Edit') {
      const subscription = this.roomService
        .UpdateRoom(this.roomId(), {
          roomNumber: enteredRoomNumber,
          pricePerNight: enteredPricePerNight,
          status: enteredRoomStatus,
          hotelId: enteredHotelId,
          roomTypeId: enteredRoomTypeId,
        })
        .subscribe({
          next: (res) => {
            this.toastr.success('Room Successfully Updated');
            setTimeout(() => {
              this.router.navigate(['admin-dashboard', 'rooms']);
            }, 500);
          },
          error: (err) => {
            this.toastr.error('Failed to Update Room');
            console.log(err);
          },
        });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }
}
