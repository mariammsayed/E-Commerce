import { Component, inject } from '@angular/core';
import {ReactiveFormsModule ,FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  errMessage:string = ''
  isLoading:boolean = false
  register: FormGroup = new FormGroup({
    "name" : new FormControl(null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
    "email" : new FormControl(null, [Validators.required , Validators.email]),
    "password" : new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)]),
    "rePassword" : new FormControl(null , [Validators.required]),
    "phone" : new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, {validators : this.confirmPassword} )




  submitForm():void{
    if(this.register.valid){
      this.isLoading = true
      
      this.authService.sendRegisterForm(this.register.value).subscribe({
        next : (res) => {
          
          console.log(res)
          this.register.reset();
          this.router.navigate(['/login'])
        },
        error : (err) => {
          this.errMessage = err.error.message
        }
      })
    }
  }

  confirmPassword(group : AbstractControl):any{

    return group.get('password')?.value === group.get('rePassword')?.value ? null : {notSame : true}
  }

}
