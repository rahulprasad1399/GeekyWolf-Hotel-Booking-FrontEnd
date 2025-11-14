import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ɵInternalFormsSharedModule } from "@angular/forms"
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from "@angular/forms"
import { LoginService } from '../../services/login.service';
import { Router } from "@angular/router"
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  loginService = inject(LoginService)

  constructor(private router : Router, private toastr: ToastrService) {
  }

  

  loginForm = new FormGroup({
    email : new FormControl("",[Validators.required, Validators.email]),
    password : new FormControl("",[Validators.required, Validators.minLength(8)])
  })

  onSubmit(){
    if(this.loginForm.invalid){
      console.log("Form is Invalid")
    }

    const {email, password} = this.loginForm.value

    this.loginService.onLogin(email!, password!).subscribe({
      next : (response : any) => {
        if(response.success){
          
          this.toastr.success("Login successfull")
          this.router.navigate(["/admin-dashboard"])
        }
      },
      error : (err) => {
        this.toastr.error("Login Failed")
        console.log("Error in login : ", err)
      }
    })
  }
}
