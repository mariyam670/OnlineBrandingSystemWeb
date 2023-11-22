import { upsertRate } from '../../models/Rate/upsertRate';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroment';
import { IRate } from '../../models/Rate/IRate';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  constructor(private http:HttpClient) { }

  getRatings():Observable<IRate[]>{
    var url=`${enviroment.api}/Rating/GetRatings`;
    return this.http.get<IRate[]>(url);
  }

  getRatingsById(id:number):Observable<IRate>{
    var url=`${enviroment.api}/Rating/GetRatingsById/{id}`;
    return this.http.get<IRate>(url);
  }

  addRatings(rate:upsertRate):Observable<upsertRate>{
    var url=`${enviroment.api}/Rating/AddRatings`;
    return this.http.post<upsertRate>(url,rate);
  }

  
  updateRatings(rate:upsertRate):Observable<upsertRate>{
    var url=`${enviroment.api}/Rating/updateRatings`;
    return this.http.put<upsertRate>(url,rate);
  }
}
