import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseApiUrl = 'https://ecommerce.routemisr.com'
  httpClient = inject(HttpClient);


  getAllProducts():Observable<any> {
    return this.httpClient.get(this.baseApiUrl + '/api/v1/products')
  }

  getSpacificProduct(id:string):Observable<any> {
    return this.httpClient.get(this.baseApiUrl + `/api/v1/products/${id}`)
  }

}
