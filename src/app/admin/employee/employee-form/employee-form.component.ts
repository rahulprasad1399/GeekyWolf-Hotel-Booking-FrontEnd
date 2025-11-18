import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../../model/model.component';

@Component({
  selector: 'app-employee-form',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent {
  action = input.required<string>();
  employeeService = inject(EmployeeService);
  destroyRef = inject(DestroyRef);
  router = inject(Router);
  employeeId = signal('');

  hotelService = inject(HotelService);
  hotels = signal<Hotel[]>([]);

  activatedRoute = inject(ActivatedRoute);

  constructor(private toastr: ToastrService) {}

  // EDIT
  ngOnInit() {
    const hotelSub = this.hotelService.GetAllHotels().subscribe({
      next: (res) => this.hotels.set(res),
      error: (err) => console.log(err),
    });

    this.destroyRef.onDestroy(() => {
      hotelSub.unsubscribe();
    });

    if (this.action() === 'Edit') {
      this.employeeId.set(
        this.activatedRoute.snapshot.paramMap.get('employeeId')!
      );
      this.employeeService.GetEmployeeById(this.employeeId()).subscribe({
        next: (res) => {
          this.form.patchValue({
            fullName: res.fullName,
            role: res.role,
            email: res.email,
            hotelId: Number(res.hotelId),
          });
        },
        error: (err) => console.log(err),
      });
    }
  }

  form = new FormGroup({
    fullName: new FormControl('', {
      validators: [Validators.required],
    }),
    role: new FormControl(''),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    hotelId: new FormControl(0, {
      validators: [Validators.required],
    }),
  });

  get IsNameValid() {
    return (
      this.form.controls.fullName.touched &&
      this.form.controls.fullName.invalid &&
      this.form.controls.fullName.dirty
    );
  }

  get IsEmailValid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.invalid &&
      this.form.controls.email.dirty
    );
  }

  get IsHotelIdValid() {
    return (
      this.form.controls.hotelId.touched &&
      this.form.controls.hotelId.invalid &&
      this.form.controls.hotelId.dirty
    );
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }

    const enteredFullName = this.form.value.fullName;
    const enteredEmail = this.form.value.email;
    const enterdHotelId = Number(this.form.value.hotelId);
    const enteredRole = this.form.value.role;

    if (this.action() === 'Add') {
      const subscription = this.employeeService
        .CreateEmployee({
          fullName: enteredFullName,
          email: enteredEmail,
          hotelId: enterdHotelId,
          role: enteredRole,
        })
        .subscribe({
          next: (res) => {
            this.toastr.success('Employee Successfully Added');
            setTimeout(() => {
              this.router.navigate(['admin-dashboard', 'employees']);
            }, 500);
          },
          error: (err) => {
            this.toastr.error('Failed to Add Employee');
            console.log(err);
          },
        });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }

    if (this.action() === 'Edit') {
      const subscription = this.employeeService
        .UpdateEmployee(this.employeeId(), {
          fullName: enteredFullName,
          email: enteredEmail,
          hotelId: enterdHotelId,
          role: enteredRole,
        })
        .subscribe({
          next: (res) => {
            this.toastr.success('Employee Successfully Updated');
            setTimeout(() => {
              this.router.navigate(['admin-dashboard', 'employees']);
            }, 500);
          },
          error: (err) => {
            this.toastr.error('Failed to Update Employee');
            console.log(err);
          },
        });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }
}
