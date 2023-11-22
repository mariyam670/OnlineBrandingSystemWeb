import { ISite } from './../../../core/models/site/ISite';
import { BrandService } from './../../../core/services/brand/brand.service';
import { Component, OnInit ,Inject} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogMode } from 'src/app/core/enum/DialogMode';
import { SiteService } from 'src/app/core/services/site/site.service';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss']
})
export class EditBrandComponent implements OnInit{
  brandForm: FormGroup;
  DialogMode=DialogMode;
  imageBase64: string;
  sites:ISite[];
  // imageValue=this.data.site.image;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private brandService: BrandService,private siteService: SiteService) {
    this.getSites();
    this.createForm();
    if (data.mode == this.DialogMode.Edit) {
      this.autoFillForm();
    }

  }
  ngOnInit(): void {
   
  }

  //getting site name and site id
 getSites(){
  this.siteService.getSites().subscribe({
    next: data => {
      this.sites=data;
    },
    error: err => {
      console.log("error "+err);
    }
  })
 }

createForm() {
  this.brandForm = new FormGroup({
    name: new FormControl('', Validators.required),
    emailId: new FormControl('',  [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    contact: new FormControl('', Validators.required),
    quote: new FormControl('',Validators.required),
    keywords: new FormControl('',Validators.required),
    interests: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    siteName: new FormControl('',Validators.required),
    image: new FormControl('', Validators.required)
  });
}


autoFillForm() {
  this.brandForm.patchValue({
    name:this.data.brand.brandName,
    emailId: this.data.brand.brandEmail,
    contact: this.data.brand.brandContact,
    quote: this.data.brand.brandQuote,
    keywords:  this.data.brand.brandKeyword,
    interests:this.data.brand.brandInterests,
    description:this.data.brand.brandDescription,
    siteName: this.data.brand.siteId,
    image: this.data.brand.brandImage
  })
}


  upsertBrand() {
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
      formData.append('SiteImage', this.image.value, this.image.value.name);

      formData.append('ChangeBy', '0');
      formData.append('CreatedBy', '1');

      this.brandService.addBrands(formData).subscribe({
        next: data => {
          console.log("added successfully");
        },
        error: err => {
          console.log("error ");
        }
      })

      console.log(this.brandForm);
    }
    else {
      const formData = new FormData();
      formData.append("brandId",this.data.brand.brandId)
      formData.append('brandName', this.name.value);
      formData.append('brandEmail', this.emailId.value);
      formData.append('brandContact', this.contact.value);
      formData.append('brandQuote', this.quote.value);
      formData.append('brandKeyword', this.keywords.value);
      formData.append('brandInterests', this.interests.value);
      formData.append('brandDescription', this.description.value);
      formData.append('siteId', this.siteName.value);

      // Append the IFormFile (SiteImage) to the FormData
      formData.append('brandImage', this.image.value, this.image.value.name);

      formData.append('changeBy', '1');
      formData.append('createdBy', '1');
      this.brandService.addBrands(formData).subscribe({
        next: data => {
          console.log("Updated successfully");
        },
        error: err => {
          console.log("error ");
        }
      })

      console.log(this.brandForm);
    }

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

