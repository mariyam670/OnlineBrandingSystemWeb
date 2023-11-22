import { MatDialog } from '@angular/material/dialog';
import { RateService } from './../../core/services/rate/rate.service';
import { Component, OnInit } from '@angular/core';
import { IRate } from 'src/app/core/models/Rate/IRate';
import { DialogMode } from 'src/app/core/enum/DialogMode';
import { EditRatingComponent } from './edit-rating/edit-rating.component';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit{
  rates:IRate[];
  DialogMode = DialogMode;
  
  constructor(private rateService: RateService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getRates();
  }

  getRates(){
    this.rateService.getRatings().subscribe({
      next: data => {
        this.rates = data;
        // this.datasource = new MatTableDataSource<ISite>(data);
        // this.datasource.paginator = this.paginator;
        // this.datasource.sort = this.sort;
        console.log(this.rates);
      }
    })
  }

  openDialog(rate: IRate | null, mode: DialogMode) {
    const dialogRef = this.dialog.open(EditRatingComponent, {
      width: '25%',
      data: {
        rate: rate,
        mode: mode
      },
    });

  }
}
