import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  myToken = localStorage.getItem('token')

httpClient = inject(HttpClient)


checkOutSession(cartId:string ,data:any):Observable<any> {
  return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200/`,
    {
      "shippingAddress":data
    }
  )
}
}
