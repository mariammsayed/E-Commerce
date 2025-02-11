import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:any = null
  httpClient = inject(HttpClient)
  router = inject(Router)

  sendRegisterForm(data:any):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data)
  }

  sendLoginForm(data:any):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
  }



  saveUserData():void{
    if (localStorage.getItem('token')){ {
     this.userData = jwtDecode(localStorage.getItem('token')!)
    }
    }
  }


  logout():void{
    localStorage.removeItem('token')
    this.userData = null
    this.router.navigate(['/login'])

  }


  submitEmail(email:string):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,email)
  }
  submitCode(code:string):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,code)
  }
  submitNewPassword(data:any):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
  }
}
