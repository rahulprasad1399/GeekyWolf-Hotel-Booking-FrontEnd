import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './customer-register.component.html',
  styleUrl: './customer-register.component.scss',
})
export class CustomerRegisterComponent {
  customerService = inject(CustomerService);

  form = new FormGroup({
    fullName: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    phoneNumber: new FormControl('', {
      validators: [Validators.required],
    }),
    idProofNumber: new FormControl(''),
    password: new FormControl('', { validators: [Validators.required] }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  get IPhoneValid() {
    return (
      this.form.controls.phoneNumber.invalid &&
      this.form.controls.phoneNumber.touched &&
      this.form.controls.phoneNumber.dirty
    );
  }
  get IsFullNameValid() {
    return (
      this.form.controls.fullName.invalid &&
      this.form.controls.fullName.touched &&
      this.form.controls.fullName.dirty
    );
  }
  get IsEmailValid() {
    return (
      this.form.controls.email.invalid &&
      this.form.controls.email.touched &&
      this.form.controls.email.dirty
    );
  }
  get IsPasswordValid() {
    return (
      this.form.controls.password.invalid &&
      this.form.controls.password.touched &&
      this.form.controls.password.dirty
    );
  }
  get IsCondirmPasswordValid() {
    return (
      this.form.controls.confirmPassword.invalid &&
      this.form.controls.confirmPassword.touched &&
      this.form.controls.confirmPassword.dirty
    );
  }

  get IsPasswordMatch() {
    return (
      this.form.controls.password.value ===
      this.form.controls.confirmPassword.value
    );
  }

  onSubmit() {
    if (this.form.invalid) return;

    const customer = {
      fullName: this.form.controls.fullName.value,
      email: this.form.controls.email.value,
      phoneNumber: this.form.controls.phoneNumber.value,
      idProofNumber: this.form.controls.idProofNumber.value,
      password: this.form.controls.password.value,
    };

    this.customerService.RegisterCustomer(customer).subscribe({
      next: (res) => {
        console.log("customer registration successfull")
        const loginData = {
          email: this.form.controls.email.value!,
          password: this.form.controls.password.value!,
        };
        this.customerService.LoginCustomer(loginData).subscribe({
          next: (res) => console.log('customer logged in successfully'),
          error: (err) => console.log('customer logged in failed'),
        });
      },
      error: (err) => console.log("Customer registration failed"),
    });
  }
}
