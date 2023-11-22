import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSharedModule } from '../shared/admin-shared/admin-shared.module';
import { SiteRoutingModule } from './site.routing';
import { EditSitesComponent } from './edit-sites/edit-sites.component';
import { SiteComponent } from './site.component';

@NgModule({
  declarations: [
    EditSitesComponent,
    SiteComponent
  ],
  imports: [
    CommonModule,
    SiteRoutingModule,
    AdminSharedModule
  ]
})
export class SiteModule { }
