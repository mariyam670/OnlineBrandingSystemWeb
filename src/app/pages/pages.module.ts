import { PagesRoutingModule } from './pages.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { PagesSharedModule } from './shared/pages-shared/pages-shared.module';

@NgModule({
  declarations: [ LayoutComponent],
  imports: [
    CommonModule,
    PagesSharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
