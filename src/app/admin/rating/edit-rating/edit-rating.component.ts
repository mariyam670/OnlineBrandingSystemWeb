import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { DialogMode } from 'src/app/core/enum/DialogMode';
import { IBrand } from 'src/app/core/models/brand/Ibrand';
import { upsertRate } from 'src/app/core/models/Rate/upsertRate';
import { BrandService } from 'src/app/core/services/brand/brand.service';
import { RateService } from 'src/app/core/services/rate/rate.service';

@Component({
  selector: 'app-edit-rating',
  templateUrl: './edit-rating.component.html',
  styleUrls: ['./edit-rating.component.scss']
})
export class EditRatingComponent implements OnInit {
  rateForm: FormGroup
  DialogMode = DialogMode;
  brands: IBrand[];
  value: number; //for stars

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private rateService: RateService, private brandService: BrandService,private dialogRef: MatDialogRef<EditRatingComponent>,private toast: NgToastService) {
    this.getBrands();
    this.createForm();
    if (data.mode == this.DialogMode.Edit) {
      this.autoFillForm();
    }
  }

  ngOnInit(): void {

  }

  //getting brand name and brand id
  getBrands() {
    this.brandService.getBrands().subscribe({
      next: data => {
        this.brands = data;
      },
      error: err => {
        console.log("error " + err);
      }
    })
  }

  createForm() {
    this.rateForm = new FormGroup({
      brandName: new FormControl('', Validators.required),
      rate: new FormControl('', Validators.required)
    })

  }

  autoFillForm() {
    this.rateForm.patchValue({
      brandName: this.data.rate.brandId,
      rate: this.data.rate.ratingValue
    })
  }

  upsertRate() {
    //   "rateId": 0,
    // "ratingValue": 0,
    // "brandId": 0,
    // "userId": 0
    if (this.rateForm.status == 'VALID'){
    if (this.data.mode == this.DialogMode.New) {
      const rateObj: upsertRate = {
        rateId: 0,
        ratingValue: this.Ratings.value,
        brandId: this.BrandName.value,
        userId: 2
      }
      this.rateService.addRatings(rateObj).subscribe({
        next: data => {
          this.dialogRef.close();
          this.toast.success({detail:"SUCCESS",summary:'Rating Added Successfully',duration:5000, position: 'topLeft'});
          console.log("added successfully");
        },
        error: err => {
          this.dialogRef.close();
          this.toast.error({detail:"ERROR",summary:'Failed to Add Rating ',duration:5000, position: 'topLeft'});
          console.log("error ");
        }
      })
    }
    else {
      const rateObj: upsertRate = {
        rateId: this.data.rate.rateId,
        ratingValue: this.Ratings.value,
        brandId: this.BrandName.value,
        userId: 2
      }
      this.rateService.updateRatings(rateObj).subscribe({
        next: data => {
          this.dialogRef.close();
          this.toast.success({detail:"SUCCESS",summary:'Rating Updated Successfully',duration:5000, position: 'topRight'});
          console.log("updated successfully");
        },
        error: err => {
          this.dialogRef.close();
          this.toast.error({detail:"ERROR",summary:'Failed to update Rating',duration:5000, position: 'topRight'});
          console.log("error ");
        }
      })
      console.log(this.rateForm)

    }
    }
    else{
      console.log("Invalid Form");
    }

  
  }


  get BrandName() {
    return this.rateForm.get('brandName');
  }

  get Ratings() {
    return this.rateForm.get('rate');
  }
}
