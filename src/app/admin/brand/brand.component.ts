import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { DialogMode } from 'src/app/core/enum/DialogMode';
import { BrandService } from 'src/app/core/services/brand/brand.service';
import { EditBrandComponent } from './edit-brand/edit-brand.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SiteService } from 'src/app/core/services/site/site.service';
import { ISite } from 'src/app/core/models/site/ISite';
import { IBrand } from 'src/app/core/models/brand/Ibrand';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],

})
export class BrandComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  brands: IBrand[];
  DialogMode = DialogMode;
  pageSize: number = 10; // Set your desired page size
  currentPage: number = 0;
  sites: ISite[];
  site:ISite
  columns:any
  constructor(private brandService: BrandService, public dialog: MatDialog, private siteService: SiteService) { }

  ngOnInit(): void {
    this.getSites();
    this.getBrands();
  }

  //for search field
  applyFilter(data: Event) {
    const filterValue = (data.target as HTMLInputElement).value;
  }

  getBrands() {
    
    this.brandService.getBrands().subscribe({
      next: data => {
        this.brands = data;
        this.columns = [
          this.brands.slice(0, Math.ceil(this.brands.length / 2)),
          this.brands.slice(Math.ceil(this.brands.length / 2))
        ];
        console.log(this.brands);
        
      }
    })
  }

  getSites() {
    this.siteService.getSites().subscribe({
      next: data => {
        this.sites = data
       
      }
    })
  }

  getSiteName(siteId: number): string {
    console.log(this.sites)
    this.sites.filter(site => {
      if(site.siteId ===siteId)
      {
         this.site=site;
      }
    })
    return this.site?this.site.siteTitle : 'Unknown Site'
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

  openDialog(brand: IBrand | null, mode: DialogMode) {
    const dialogRef = this.dialog.open(EditBrandComponent, {
      width: '40%',
      data: {
        brand: brand,
        mode: mode
      },
    });

  }


}
