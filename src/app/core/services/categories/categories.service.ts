import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  httpClient = inject(HttpClient);


  getAllCategories():Observable<any> {
    return this.httpClient.get(environment.baseUrl + '/api/v1/categories')
  }

  getSpacificCategory(id:string):Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/categories/${id}`)
  }
}
