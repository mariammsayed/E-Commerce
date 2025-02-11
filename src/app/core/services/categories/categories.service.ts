import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseApiUrl = 'https://ecommerce.routemisr.com'
  httpClient = inject(HttpClient);


  getAllCategories():Observable<any> {
    return this.httpClient.get(this.baseApiUrl + '/api/v1/categories')
  }

  getSpacificCategory(id:string):Observable<any> {
    return this.httpClient.get(this.baseApiUrl + `/api/v1/categories/${id}`)
  }
}
