import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [
  {
    path:'admin',
    loadChildren:()=> import("./admin/admin.module").then(m=>m.AdminModule)
  },
  {
    path:'',
    component:LayoutComponent,
    loadChildren:()=> import("./pages/pages.module").then(m=>m.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
