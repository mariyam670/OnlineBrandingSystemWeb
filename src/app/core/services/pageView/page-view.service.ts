import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroment';
import { IPageView } from '../../models/PageView/IPageView';
import { IupsertPageView } from '../../models/PageView/IupsertPageView';

@Injectable({
  providedIn: 'root'
})
export class PageViewService {
  constructor(private http:HttpClient) { }

  getPageViews():Observable<IPageView[]>{
    var url=`${enviroment.api}/PageView/GetPageViews`;
    return this.http.get<IPageView[]>(url);
  }

  addPageView(pageView:IupsertPageView):Observable<IupsertPageView>{
    var url=`${enviroment.api}/PageView/AddPageViews`;
    return this.http.post<IupsertPageView>(url,pageView);
  }

  
  updatePageView(pageView:IupsertPageView):Observable<IupsertPageView>{
    var url=`${enviroment.api}/PageView/updatePageViews`;
    return this.http.put<IupsertPageView>(url,pageView);
  }
}
