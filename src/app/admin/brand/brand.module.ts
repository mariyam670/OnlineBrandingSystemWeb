import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandComponent } from './brand.component';
import { AdminSharedModule } from '../shared/admin-shared/admin-shared.module';
import { BrandRoutingModule } from './brand.routing';
import { EditBrandComponent } from './edit-brand/edit-brand.component';

@NgModule({
  declarations: [
    BrandComponent,
    EditBrandComponent
  ],
  imports: [
    CommonModule,
    AdminSharedModule,
    BrandRoutingModule
  ]
})
export class BrandModule { }
