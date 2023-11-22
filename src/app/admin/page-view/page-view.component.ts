import { PageViewService } from './../../core/services/pageView/page-view.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogMode } from 'src/app/core/enum/DialogMode';
import { IPageView } from 'src/app/core/models/PageView/IPageView';
import { EditPageViewComponent } from './edit-page-view/edit-page-view.component';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss']
})
export class PageViewComponent {
  pageView:IPageView[];
  DialogMode = DialogMode;
  
  constructor(private pageViewService: PageViewService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPageViews();
  }

  getPageViews(){
    this.pageViewService.getPageViews().subscribe({
      next: data => {
        this.pageView = data;
        // this.datasource = new MatTableDataSource<ISite>(data);
        // this.datasource.paginator = this.paginator;
        // this.datasource.sort = this.sort;
        console.log(this.pageView);
      }
    })
  }

  openDialog(pageView: IPageView | null, mode: DialogMode) {
    const dialogRef = this.dialog.open(EditPageViewComponent, {
      width: '25%',
      data: {
        pageView: pageView,
        mode: mode
      },
    });

  }
}
