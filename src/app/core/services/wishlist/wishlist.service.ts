import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  httpClient = inject(HttpClient)
  wishListCount:WritableSignal<number> = signal(0)




  addProductToWishList(id:string):Observable<any>{
    return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist` ,{
      "productId": id,
    })
  }

  removeProductFromWishList(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`)
  }

  getAllWishList():Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`)
  }
}
