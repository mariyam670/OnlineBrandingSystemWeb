import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomeModule)
      },
    //   {
    //     path: 'brand',
    //     loadChildren: () => import('../admin/brand/brand.module').then(m => m.BrandModule)
    //   },
    //   {
    //     path: 'rating',
    //     loadChildren: () => import('../admin/rating/rating.module').then(m => m.RatingModule)
    //   },
    //   {
    //     path: 'pageView',
    //     loadChildren: () => import('../admin/page-view/page-view.module').then(m => m.PageViewModule)
    //   }
    ]
  }]
  ;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }

export const routedComponents = [
  PagesComponent
]
