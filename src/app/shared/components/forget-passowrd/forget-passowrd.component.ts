import { Router } from '@angular/router';
import { AuthService } from './../../../core/services/auth/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-passowrd',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-passowrd.component.html',
  styleUrl: './forget-passowrd.component.scss'
})
export class ForgetPassowrdComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)
  email:boolean = true
  code:boolean = false 
  reset:boolean = false
  loading:boolean = false
  isChange:boolean = false
  isError:boolean = false
  verifyEmail:FormGroup = new FormGroup({
    "email": new FormControl(null, [Validators.required , Validators.email])
  })

  verifyCode:FormGroup = new FormGroup({
    "resetCode": new FormControl(null, [Validators.required])
  })

  verifyPassword:FormGroup = new FormGroup({
    "email": new FormControl(null, [Validators.required , Validators.email]),
    "newPassword" : new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)])

  })


  submitEmailForm(){
    let email = this.verifyEmail.get('email')?.value
    this.verifyPassword.get('email')?.patchValue(email)
    if (this.verifyEmail.valid) {
      this.loading = true
      this.authService.submitEmail(this.verifyEmail.value).subscribe({
        next:(res)=>{
          this.email = false
          this.code = true
          this.loading= false
        },
        error:(err)=>{
          console.log(err);
          this.loading= false
        }
      })
    }
  }
  submitCodeForm(){
    if (this.verifyCode.valid) {
      this.loading = true
      this.authService.submitEmail(this.verifyEmail.value).subscribe({
        next:(res)=>{
          console.log(res);
          
          if (res.statusMsg == "success") {
            this.code = false
            this.reset = true
            this.loading= false
          }else{
            this.isError = true
            this.loading= false
          }
        },
        error:(err)=>{
          console.log(err);
          this.loading= false
        }
      })
    }
  }
  resetPassword(){
    if (this.verifyPassword.valid) {
      this.loading = true
      this.authService.submitEmail(this.verifyEmail.value).subscribe({
        next:(res)=>{
          this.isChange = true
          setInterval(() => {
            this.router.navigate(['/home'])
          }, 500);
          this.loading= false

        },
        error:(err)=>{
          console.log(err);
          this.loading= false

        }
      })
    }
  }
}

