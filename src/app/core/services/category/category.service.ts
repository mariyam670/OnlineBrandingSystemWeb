import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroment';
import { ICategory } from '../../models/category/ICategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getCategory():Observable<ICategory[]>{
    var url=`${enviroment.api}/Category/GetCategory`;
    return this.http.get<ICategory[]>(url);
  }

  addCategory(brand:FormData):Observable<FormData>{
    var url=`${enviroment.api}/Category/AddCategory`;
    return this.http.post<FormData>(url,brand);
  }

  
  updateCategory(brand:FormData):Observable<FormData>{
    var url=`${enviroment.api}/Category/updateCategory`;
    return this.http.put<FormData>(url,brand);
  }
}
