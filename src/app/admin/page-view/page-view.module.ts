import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageViewComponent } from './page-view.component';
import { PageViewRoutingModule }from'./page-view.routing';
import { AdminSharedModule } from '../shared/admin-shared/admin-shared.module';
import { EditPageViewComponent } from './edit-page-view/edit-page-view.component';
@NgModule({
  declarations: [PageViewComponent,EditPageViewComponent],
  imports: [
    CommonModule,
    PageViewRoutingModule,
    AdminSharedModule
  ]
})
export class PageViewModule { }
