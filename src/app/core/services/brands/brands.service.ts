import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  httpClient = inject(HttpClient)
  
  getAllBrands():Observable<any> {
    return this.httpClient.get(environment.baseUrl + '/api/v1/brands')
  }


  getSpacificBrand(id:string):Observable<any> {
    return this.httpClient.get(environment.baseUrl + `/api/v1/brands/${id}`)
  }
}
