import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'site',
        pathMatch: 'full'
      },
      {
        path: 'site',
        loadChildren: () => import('../admin/site/site.module').then(m => m.SiteModule)
      },
      {
        path: 'brand',
        loadChildren: () => import('../admin/brand/brand.module').then(m => m.BrandModule)
      },
      {
        path: 'rating',
        loadChildren: () => import('../admin/rating/rating.module').then(m => m.RatingModule)
      }

    ]
    // 
    //   {
    //     path: 'source',
    //     loadChildren: () => import('./sources/sources.module').then(m => m.SourcesModule)
    //   },
    //   {
    //     path: 'qualification',
    //     loadChildren: () => import('./qualification/qualification.module').then(m => m.QualificationModule)
    //   },
    //   {
    //     path: '**',
    //     redirectTo: 'application',
    //     pathMatch: 'full'
    //   }
    // ]
  }]
  ;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }

export const routedComponents = [
  AdminComponent
]
