import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { DialogMode } from 'src/app/core/enum/DialogMode';
import { BrandService } from 'src/app/core/services/brand/brand.service';
import { IBrand } from 'src/app/core/models/site/brand/Ibrand';
import { EditBrandComponent } from './edit-brand/edit-brand.component';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],

})
export class BrandComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  brands: IBrand[];
  DialogMode = DialogMode;
  pageSize: number = 2; // Set your desired page size
  currentPage: number = 0;
  
  constructor(private brandService: BrandService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getBrands();
  }

  //for search field
  applyFilter(data: Event) {
    const filterValue = (data.target as HTMLInputElement).value;
  }

  getBrands() {
    this.brandService.getBrands().subscribe({
      next: data => {
        this.brands = data ;
        console.log(this.brands);
      }
    })
  }

  
    // Function to determine if a site should be displayed based on the current page
    isBrandVisible(siteIndex: number): boolean {
      const startIndex = this.currentPage * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return siteIndex >= startIndex && siteIndex < endIndex;
    }
  
    // Function to update the current page
    updatePage(newPage: number) {
      this.currentPage = newPage;
    }

  openDialog(brand:IBrand|null,mode:DialogMode){
    const dialogRef=this.dialog.open(EditBrandComponent,{
      width:'40%',
      data:{
        brand:brand,
        mode:mode
      },
    });

  }


}
