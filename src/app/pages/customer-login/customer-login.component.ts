import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.scss',
})
export class CustomerLoginComponent {

  customerService = inject(CustomerService)
  router = inject(Router)

  constructor(private toastr: ToastrService) {}

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

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

  onSubmit(){

    const customerData = {
      email : this.form.controls.email.value!,
      password : this.form.controls.password.value!
    }

    this.customerService.LoginCustomer(customerData).subscribe({
      next : (res) => {
        this.toastr.success("Login Successfull")
        this.router.navigate([''])
      },
      error : (err) => console.log(err)
    })
  }

}
