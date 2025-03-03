import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  myToken = localStorage.getItem('token')
  httpClient = inject(HttpClient)
  cartNumber:WritableSignal<number> = signal(0)


  constructor() {
    effect(() => {
      localStorage.setItem('cartNumber', this.cartNumber().toString())
    })
   }

  addToCart(id:string):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`,
      {
        "productId": id,
      },
      {
        headers:{
          token: this.myToken!
        }
      }
    )
  }


  getLoggedUserCart():Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`)
  }

  deleteItem(id:string):Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`)
  } 

  updateItemCount(id:string, count:number):Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,{
      "count": count      
    })
    }


    clearUserCart():Observable<any> {
      return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`,)  
    }
}
