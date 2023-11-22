import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { DialogMode } from 'src/app/core/enum/DialogMode';
import { IupsertPageView } from 'src/app/core/models/PageView/IupsertPageView';
import { IBrand } from 'src/app/core/models/brand/Ibrand';
import { BrandService } from 'src/app/core/services/brand/brand.service';
import { PageViewService } from 'src/app/core/services/pageView/page-view.service';

@Component({
  selector: 'app-edit-page-view',
  templateUrl: './edit-page-view.component.html',
  styleUrls: ['./edit-page-view.component.scss']
})
export class EditPageViewComponent implements OnInit {
  PageViewForm: FormGroup
  DialogMode = DialogMode;
  brands: IBrand[];
  value: number; //for stars

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private pageViewService: PageViewService, private brandService: BrandService,private dialogRef: MatDialogRef<EditPageViewComponent>,private toast: NgToastService) {
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
    this.PageViewForm = new FormGroup({
      brandName: new FormControl('', Validators.required),
      pageView: new FormControl('', Validators.required)
    })

  }

  autoFillForm() {
    this.PageViewForm.patchValue({
      brandName: this.data.pageView.brand.brandId,
      pageView: this.data.pageView.viewsCount
    })
  }

  upsertPageView() {
    //   "PageViewId": 0,
    // "ratingValue": 0,
    // "brandId": 0,
    // "userId": 0

    if (this.PageViewForm.status == 'VALID') {
      if (this.data.mode == this.DialogMode.New) {
        const PageViewObj: IupsertPageView = {
          pageViewId: 0,
          viewsCount: this.viewsCount.value,
          brandId: this.BrandName.value,
          userId: 2
        }
        this.pageViewService.addPageView(PageViewObj).subscribe({
          next: data => {
            this.dialogRef.close();
            this.toast.success({detail:"SUCCESS",summary:'Page View Count Added Successfully',duration:5000, position: 'topLeft'});
            console.log("added successfully");
          },
          error: err => {
            this.dialogRef.close();
            this.toast.error({detail:"ERROR",summary:'Failed to Add Page View Count ',duration:5000, position: 'topLeft'});
            console.log("error ");
          }
        })
      }
      else {
        const PageViewObj: IupsertPageView = {
          pageViewId: this.data.pageView.pageViewId,
          viewsCount: this.viewsCount.value,
          brandId: this.BrandName.value,
          userId: 2
        }
        this.pageViewService.updatePageView(PageViewObj).subscribe({
          next: data => {
            this.dialogRef.close();
          this.toast.success({detail:"SUCCESS",summary:'Page View Count Updated Successfully',duration:5000, position: 'topRight'});
          console.log("updated successfully");
          },
          error: err => {
            this.dialogRef.close();
            this.toast.error({detail:"ERROR",summary:'Failed to update Page View Count',duration:5000, position: 'topRight'});
            console.log("error ");
          }
        })
        console.log(this.PageViewForm)

      }
    }
    else {
      console.log("Invalid Form");
    }

  }


  get BrandName() {
    return this.PageViewForm.get('brandName');
  }

  get viewsCount() {
    return this.PageViewForm.get('pageView');
  }
}