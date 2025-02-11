import { Component, inject } from '@angular/core';
import {ReactiveFormsModule ,FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  err:boolean = false
  isLoading:boolean = false
  loginForm: FormGroup = new FormGroup({
    "email" : new FormControl(null, [Validators.required ]),
    "password" : new FormControl(null , [Validators.required ]),
  })

  
  submitForm():void{
    if(this.loginForm.valid){
      this.isLoading = true
      this.authService.sendLoginForm(this.loginForm.value).subscribe({
        next : (res) => {
          console.log(res)
          this.loginForm.reset();
          localStorage.setItem('token' , res.token)
          this.authService.saveUserData()
          this.router.navigate(['/home'])

        },
        error : (err) => {
          this.err = true
          this.isLoading = false
        }
      })
    }
  }
}
