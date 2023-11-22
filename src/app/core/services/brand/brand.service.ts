import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroment';

import { HttpClient } from '@angular/common/http';
import { IBrand } from '../../models/brand/Ibrand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http:HttpClient) { }

  getBrands():Observable<IBrand[]>{
    var url=`${enviroment.api}/Brand/GetBrands`;
    return this.http.get<IBrand[]>(url);
  }

  addBrands(brand:FormData):Observable<FormData>{
    var url=`${enviroment.api}/Brand/AddBrands`;
    return this.http.post<FormData>(url,brand);
  }

  
  updateBrands(brand:FormData):Observable<FormData>{
    var url=`${enviroment.api}/Brand/updateBrands`;
    return this.http.put<FormData>(url,brand);
  }
}
