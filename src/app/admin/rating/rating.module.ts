import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingRoutingModule } from './rating.routing';
import { AdminSharedModule } from '../shared/admin-shared/admin-shared.module';
import { RatingComponent } from './rating.component';
@NgModule({
  declarations: [
    RatingComponent
  ],
  imports: [
    CommonModule,
    RatingRoutingModule,
    AdminSharedModule
  ]
})
export class RatingModule { }
