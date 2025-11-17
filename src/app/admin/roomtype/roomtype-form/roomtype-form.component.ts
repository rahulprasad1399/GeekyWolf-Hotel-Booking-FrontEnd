import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { RoomTypeService } from '../../services/room-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-roomtype-form',
  imports: [ReactiveFormsModule],
  templateUrl: './roomtype-form.component.html',
  styleUrl: './roomtype-form.component.scss',
})
export class RoomtypeFormComponent {
  action = input.required<string>();
  roomTypeService = inject(RoomTypeService);
  destroyRef = inject(DestroyRef);
  router = inject(Router);
  roomTypeId = signal('');

  activatedRoute = inject(ActivatedRoute);

  constructor(private toastr: ToastrService) {}

  // EDIT
  ngOnInit() {
    if (this.action() === 'Edit') {
      this.roomTypeId.set(
        this.activatedRoute.snapshot.paramMap.get('roomTypeId')!
      );
      this.roomTypeService.GetRoomTypeById(this.roomTypeId()).subscribe({
        next: (res) => {
          this.form.patchValue({
            typeName: res.typeName,
            description: res.description,
            capacity: res.capacity,
          });
        },
        error: (err) => console.log(err),
      });
    }
  }

  form = new FormGroup({
    typeName: new FormControl('', {
      validators: [Validators.required],
    }),
    description: new FormControl(''),
    capacity: new FormControl(0, {
      validators: [Validators.required, Validators.min(1)],
    }),
  });

  get IsTypeNameValid() {
    return (
      this.form.controls.typeName.touched &&
      this.form.controls.typeName.invalid &&
      this.form.controls.typeName.dirty
    );
  }

  get IsCapacityValid() {
    return (
      this.form.controls.capacity.touched &&
      this.form.controls.capacity.invalid &&
      this.form.controls.capacity.dirty
    );
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    if (this.action() === 'Add') {
      const subscription = this.roomTypeService
        .CreateRoomType(this.form.value)
        .subscribe({
          next: (res) => {
            this.toastr.success('Room Type Successfully Added');
            this.router.navigate(['admin-dashboard', 'room-types']);
          },
          error: (err) => {
            this.toastr.error('Failed to Add Room Type');
            console.log(err);
          },
        });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }

    if (this.action() === 'Edit') {
      const subscription = this.roomTypeService
        .UpdateRoomType(this.roomTypeId(), this.form.value)
        .subscribe({
          next: (res) => {
            this.toastr.success('Room Type Successfully Updated');
            setTimeout(() => {
              this.router.navigate(['admin-dashboard', 'room-types']);
            }, 500);
          },
          error: (err) => {
            this.toastr.error('Failed to Update Room Type');
            console.log(err);
          },
        });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }
}
