import { Dialog } from '@angular/cdk/dialog';
import { SiteService } from './../../../core/services/site/site.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogMode } from 'src/app/core/enum/DialogMode';

@Component({
  selector: 'app-edit-sites',
  templateUrl: './edit-sites.component.html',
  styleUrls: ['./edit-sites.component.scss']
})
export class EditSitesComponent implements OnInit {
  siteForm: FormGroup;
  DialogMode=DialogMode;
  imageBase64: string;
  // imageValue=this.data.site.image;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private siteService: SiteService) {
    this.createForm();
    if (data.mode == DialogMode.Edit) {
      this.autoFillForm();
    }

  }
  ngOnInit(): void {
   
  }

  upsertSite() {
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
          console.log("added successfully");
        },
        error: err => {
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

      formData.append('ChangeBy',this.data.site.siteId);
      formData.append('CreatedBy', this.data.site.createdBy);

      this.siteService.addSites(formData).subscribe({
        next: data => {
          console.log("Updated successfully");
        },
        error: err => {
          console.log("error ");
        }
      })

      console.log(this.siteForm);
    }

  }

  autoFillForm() {
    this.siteForm.patchValue({
      title: this.data.site.siteTitle,
      keywords: this.data.site.siteKeyword,
      description: this.data.site.siteDescription,
      url: this.data.site.siteUrl,
      emailId: this.data.site.siteEmail,
      image: this.data.site.siteImage
    })
  }

  
  createForm() {
    this.siteForm = new FormGroup({
      title: new FormControl('', Validators.required),
      keywords: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      emailId: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
      image: new FormControl('', Validators.required)
    });
  }



  onFileSelected(event: any): void {
    const file =this.image.value;
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
