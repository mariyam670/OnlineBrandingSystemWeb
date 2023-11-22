import { ISite } from './../../../core/models/site/ISite';
import { BrandService } from './../../../core/services/brand/brand.service';
import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { DialogMode } from 'src/app/core/enum/DialogMode';
import { SiteService } from 'src/app/core/services/site/site.service';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss']
})
export class EditBrandComponent implements OnInit {
  brandForm: FormGroup;
  DialogMode = DialogMode;
  imageBase64: string;
  ImagefromDb:string;
  sites: ISite[];
  // imageValue=this.data.site.image;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private brandService: BrandService, private siteService: SiteService,private dialogRef: MatDialogRef<EditBrandComponent>,private toast: NgToastService) {
    
    this.getSites();
    this.createForm();
    if (data.mode == this.DialogMode.Edit) {
      this.ImagefromDb=this.data.brand.brandImage;
      this.autoFillForm();
    }

  }
  ngOnInit(): void {

  }

  //getting site name and site id
  getSites() {
    this.siteService.getSites().subscribe({
      next: data => {
        this.sites = data;
      },
      error: err => {
        console.log("error " + err);
      }
    })
  }

  step1Complete() {
    return this.name.valid &&
    this.emailId.valid &&
    this.contact.valid;
  }
  step2Complete() {
    return this.quote.valid &&
    this.keywords.valid &&
    this.interests.valid &&
    this.description.valid;
  }

  step3Complete() {
    return this.quote.valid &&
    this.siteName.valid &&
    this.image.valid ;
  }

  fileTypeValidator(control: AbstractControl): ValidationErrors | null {
    const file = control.value;
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png']; // Define accepted image MIME types
      if (!allowedTypes.includes(file.type)) {
        return { accept: true }; // Return an error if the file type is not allowed
      }
    }
    return null;
  }

  createForm() {
    this.brandForm = new FormGroup({
      name: new FormControl('', Validators.required),
      emailId: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
      contact: new FormControl('', [Validators.required, Validators.pattern('^\\d{10}$')]),
      quote: new FormControl('', Validators.required),
      keywords: new FormControl('', Validators.required),
      interests: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      siteName: new FormControl('', Validators.required),
      image: new FormControl('')
    });
  }

  autoFillForm() {
    const byteCharacters = atob( this.data.brand.brandImage); // Decode base64
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' }); // Set the appropriate image type

    // Create a File object
    const file = new File([blob], 'imageName.png', { type: 'image/png' }); // Set the appropriate image name and type
 
    this.brandForm.patchValue({
      name: this.data.brand.brandName,
      emailId: this.data.brand.brandEmail,
      contact: this.data.brand.brandContact,
      quote: this.data.brand.brandQuote,
      keywords: this.data.brand.brandKeyword,
      interests: this.data.brand.brandInterests,
      description: this.data.brand.brandDescription,
      siteName: this.data.brand.siteId,      
      image: file
    })
  

  }

  upsertBrand() {

    if (this.brandForm.status == "VALID") {
      if (this.data.mode == this.DialogMode.New) {
        const formData = new FormData();
        formData.append('BrandName', this.name.value);
        formData.append('BrandEmail', this.emailId.value);
        formData.append('BrandContact', this.contact.value);
        formData.append('BrandQuote', this.quote.value);
        formData.append('BrandKeyword', this.keywords.value);
        formData.append('BrandInterests', this.interests.value);
        formData.append('BrandDescription', this.description.value);
        formData.append('SiteId', this.siteName.value);

        // Append the IFormFile (SiteImage) to the FormData
        formData.append('brandImage', this.image.value, this.image.value.name);

        formData.append('ChangeBy', '0');
        formData.append('CreatedBy', '1');

        this.brandService.addBrands(formData).subscribe({
          next: data => {
            this.dialogRef.close();
            this.toast.success({detail:"SUCCESS",summary:'Brand Added Successfully',duration:5000, position: 'topRight'});
            console.log("Added successfully");
          },
          error: err => {
            this.dialogRef.close();
            this.toast.error({detail:"ERROR",summary:'Failed to Add Brand',duration:5000, position: 'topRight'});
            console.log("error ");
          }
        })

        console.log(this.brandForm);
      }
      else {
        const formData = new FormData();
        formData.append("brandId", this.data.brand.brandId)
        formData.append('brandName', this.name.value);
        formData.append('brandEmail', this.emailId.value);
        formData.append('brandContact', this.contact.value);
        formData.append('brandQuote', this.quote.value);
        formData.append('brandKeyword', this.keywords.value);
        formData.append('brandInterests', this.interests.value);
        formData.append('brandDescription', this.description.value);
        formData.append('siteId', this.siteName.value);

        formData.append('brandImage', this.image.value, this.image.value.name);
        formData.append('changeBy', '1');
        formData.append('createdBy', '1');

        this.brandService.addBrands(formData).subscribe({
          next: data => {
            this.dialogRef.close();
            this.toast.success({detail:"SUCCESS",summary:'Brand Updated Successfully',duration:5000, position: 'topRight'});
            console.log("updated successfully");
          },
          error: err => {
            this.dialogRef.close();
            this.toast.error({detail:"ERROR",summary:'Failed to update Brand',duration:5000, position: 'topRight'});
            console.log("error ");
          }
        })

        console.log(this.brandForm);
      }
    }
    else {
      console.log("Invalid Form");
    }
}


  onFileSelected(event: any): void {
    const file = this.image.value;
    console.log(file);
    if (file) {
      this.convertImageToBase64(file);
    }
  }

  convertImageToBase64(file: File): void {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      // The onload event will be triggered once the file is read
      this.imageBase64 = e.target.result; // This is your base64 string
    };

    reader.readAsDataURL(file);
  }

  get name() {
    return this.brandForm.get('name');
  }
  get contact() {
    return this.brandForm.get('contact');
  }
  get emailId() {
    return this.brandForm.get('emailId');
  }
  get quote() {
    return this.brandForm.get('quote');
  }
  get keywords() {
    return this.brandForm.get('keywords');
  }
  get interests() {
    return this.brandForm.get('interests');
  }
  get description() {
    return this.brandForm.get('description');
  }

  get siteName() {
    return this.brandForm.get('siteName');
  }

  get image() {
    return this.brandForm.get('image');
  }


}

