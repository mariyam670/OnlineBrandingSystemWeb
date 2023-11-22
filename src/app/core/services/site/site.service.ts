import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISite } from '../../models/site/ISite';
import { enviroment } from 'src/enviroment';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  constructor(private http:HttpClient) { }

  getSites():Observable<ISite[]>{
    var url=`${enviroment.api}/Site/GetSites`;
    return this.http.get<ISite[]>(url);
  }

  getSitesById(id:number):Observable<ISite>{
    var url=`${enviroment.api}/Site/GetSitesById/{id}`;
    return this.http.get<ISite>(url);
  }

  addSites(site:FormData):Observable<FormData>{
    var url=`${enviroment.api}/Site/AddSites`;
    return this.http.post<FormData>(url,site);
  }

  
  updateSites(site:FormData):Observable<FormData>{
    var url=`${enviroment.api}/Site/updateSites`;
    return this.http.put<FormData>(url,site);
  }
}
