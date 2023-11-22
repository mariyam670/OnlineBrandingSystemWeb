import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingRoutingModule } from './rating.routing';
import { AdminSharedModule } from '../shared/admin-shared/admin-shared.module';
import { RatingComponent } from './rating.component';
import { EditRatingComponent } from './edit-rating/edit-rating.component';
@NgModule({
  declarations: [
    RatingComponent,
    EditRatingComponent
  ],
  imports: [
    CommonModule,
    RatingRoutingModule,
    AdminSharedModule
  ]
})
export class RatingModule { }
