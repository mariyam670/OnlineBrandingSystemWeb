import { Dialog } from '@angular/cdk/dialog';
import { SiteService } from './../../../core/services/site/site.service';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogMode } from 'src/app/core/enum/DialogMode';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-sites',
  templateUrl: './edit-sites.component.html',
  styleUrls: ['./edit-sites.component.scss']
})
export class EditSitesComponent implements OnInit {
  siteForm: FormGroup;
  DialogMode = DialogMode;
  imageBase64: string;
  ImagefromDb:string;
  // imageValue=this.data.site.image;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private siteService: SiteService,private dialogRef: MatDialogRef<EditSitesComponent>, private toast: NgToastService) {
    this.createForm();
    if (data.mode == DialogMode.Edit) {
      this.ImagefromDb=this.data.site.siteImage;
      this.autoFillForm();
    }

  }
  ngOnInit(): void {

  }

  
  step1Complete() {
    return this.title.valid &&
    this.keywords.valid
  }
  step2Complete() {
    return this.description.valid &&
    this.url.valid 
  }

  // step3Complete() {
  //   return this.quote.valid &&
  //   this.siteName.valid &&
  //   this.image.valid ;
  // }


  upsertSite() {

    if (this.siteForm.status == 'VALID') {
      if (this.data.mode == DialogMode.New) {
        const formData = new FormData();
        formData.append('SiteTitle', this.title.value);
        formData.append('SiteKeyword', this.keywords.value);
        formData.append('SiteDescription', this.description.value);
        formData.append('SiteUrl', this.url.value);
        formData.append('SiteEmail', this.emailId.value);

        // Append the IFormFile (SiteImage) to the FormData
        formData.append('SiteImage', this.image.value, this.image.value.name);

        formData.append('ChangeBy', '0');
        formData.append('CreatedBy', '1');

        this.siteService.addSites(formData).subscribe({
          next: data => {
            this.dialogRef.close();
            this.toast.success({detail:"SUCCESS",summary:'Site Added Successfully',duration:5000, position: 'topLeft'});
            console.log("added successfully");
          },
          error: err => {
            this.dialogRef.close();
            this.toast.success({detail:"SUCCESS",summary:'Failed to Add Site ',duration:5000, position: 'topLeft'});
            console.log("error ");
          }
        })

        console.log(this.siteForm);
      }
      else {
        const formData = new FormData();
        formData.append('SiteId', this.data.site.siteId);
        formData.append('SiteTitle', this.title.value);
        formData.append('SiteKeyword', this.keywords.value);
        formData.append('SiteDescription', this.description.value);
        formData.append('SiteUrl', this.url.value);
        formData.append('SiteEmail', this.emailId.value);

        // Append the IFormFile (SiteImage) to the FormData
        formData.append('SiteImage', this.image.value, this.image.value.name);

        formData.append('ChangeBy', this.data.site.siteId);
        formData.append('CreatedBy', this.data.site.createdBy);

        this.siteService.addSites(formData).subscribe({
          next: data => {
            this.dialogRef.close();
            this.toast.success({detail:"SUCCESS",summary:'Site Updated Successfully',duration:5000, position: 'topRight'});
            console.log("Updated successfully");
          },
          error: err => {
            this.dialogRef.close();
            this.toast.error({detail:"ERROR",summary:'Failed to update Site',duration:5000, position: 'topRight'});
          }
        })

        console.log(this.siteForm);
      }
    }

    else {
      console.log("Invalid Form");
    }
  }

  autoFillForm() {
    const byteCharacters = atob( this.data.site.siteImage ); // Decode base64
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' }); // Set the appropriate image type

    // Create a File object
    const file = new File([blob], this.data.site.siteTitle, { type: 'image/png' }); // Set the appropriate image name and type
 
    this.siteForm.patchValue({
      title: this.data.site.siteTitle,
      keywords: this.data.site.siteKeyword,
      description: this.data.site.siteDescription,
      url: this.data.site.siteUrl,
      emailId: this.data.site.siteEmail,
      image: file
    })
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
    this.siteForm = new FormGroup({
      title: new FormControl('', Validators.required),
      keywords: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      emailId: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
      image: new FormControl('', [Validators.required, this.fileTypeValidator])
    });
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

  get title() {
    return this.siteForm.get('title');
  }
  get keywords() {
    return this.siteForm.get('keywords');
  }
  get description() {
    return this.siteForm.get('description');
  }
  get url() {
    return this.siteForm.get('url');
  }
  get emailId() {
    return this.siteForm.get('emailId');
  }
  get image() {
    return this.siteForm.get('image');
  }


}
