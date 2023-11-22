import { ISite } from 'src/app/core/models/site/ISite';
import { SiteService } from './../../core/services/site/site.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditSitesComponent } from './edit-sites/edit-sites.component';
import { DialogMode } from 'src/app/core/enum/DialogMode';


@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  sites: ISite[];
  DialogMode = DialogMode;
  pageSize: number = 6; // Set your desired page size
  currentPage: number = 0;
  
  constructor(private siteService: SiteService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSites();
  }

  //for search field
  applyFilter(data: Event) {
    // const filterValue = (data.target as HTMLInputElement).value;
    // // this.datasource.filter = filterValue;
  }

    // Function to determine if a site should be displayed based on the current page
    isSiteVisible(siteIndex: number): boolean {
      const startIndex = this.currentPage * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return siteIndex >= startIndex && siteIndex < endIndex;
    }
  
    // Function to update the current page
    updatePage(newPage: number) {
      this.currentPage = newPage;
    }

  getSites() {
    this.siteService.getSites().subscribe({
      next: data => {
        this.sites = data;
        // this.datasource = new MatTableDataSource<ISite>(data);
        // this.datasource.paginator = this.paginator;
        // this.datasource.sort = this.sort;
        console.log(this.sites);
      }
    })
  }
  openDialog(site:ISite|null,mode:DialogMode){
    const dialogRef=this.dialog.open(EditSitesComponent,{
      width:'40%',
      data:{
        site:site,
        mode:mode
      },
    });

  }

}
