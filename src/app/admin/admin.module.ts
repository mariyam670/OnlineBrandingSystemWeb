import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { AdminRoutingModule,routedComponents } from './admin.routing';
import { AdminSharedModule } from './shared/admin-shared/admin-shared.module';
@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminSharedModule,
    
  ]
})
export class AdminModule { }
