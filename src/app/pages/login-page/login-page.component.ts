import { Component } from '@angular/core';
import { FormControl, FormGroup, ɵInternalFormsSharedModule } from "@angular/forms"
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from "@angular/forms"

@Component({
  selector: 'app-login-page',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  loginForm = new FormGroup({
    email : new FormControl("",[Validators.required, Validators.email]),
    password : new FormControl("",[Validators.required, Validators.minLength(8)])
  })

  onSubmit(){
    console.log(this.loginForm.value)
  }
}
