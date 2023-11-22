import { CategoryService } from './../../core/services/category/category.service';
import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { IcaroselImage } from 'src/app/core/models/carouselImage/IcaroselImage';
import { ICategory } from 'src/app/core/models/category/ICategory';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  Categories: Array<ICategory>;
  responsiveOptions: any;

  @ViewChild('slickModal', { static: true })
  slickModal!: SlickCarouselComponent;
  slideConfig: any
  images: IcaroselImage[] = [
    {
      imgSrc: '../../../assets/carousel/banner1.jpg',
      imageAlt: 'Banner1'
    },
    {
      imgSrc: '../../../assets/carousel/banner2.jpg',
      imageAlt: 'Banner2'
    },
    {
      imgSrc: '../../../assets/carousel/banner6.jpg',
      imageAlt: 'Banner6'
    },
    {
      imgSrc: '../../../assets/carousel/banner4.png',
      imageAlt: 'Banner4'
    },
    {
      imgSrc: '../../../assets/carousel/bannner5.jpg',
      imageAlt: 'Banner5'
    }
  ]

  constructor(private categoryService: CategoryService,private zone: NgZone) { }
  
  ngOnInit(): void {
    this.slideConfig = {
      "arrows":false,
      "slidesToShow": 4,
      "slidesToScroll": 1,
      "autoplay": false,
      "autoplaySpeed": false,
      "infinite": true,
      "responsive": [
        {
          "breakpoint": 992,
          "settings": {
            "infinite": true,
            "slidesToShow": 1,
            "slidesToScroll": 1,
          }
        },
        {
          "breakpoint": 768,
          "settings": {
            "infinite": true,
            "slidesToShow": 1,
            "slidesToSc roll": 1,
          }
        }
      ]
    };
    this.getCategory();

  }
  getCategory() {
    this.categoryService.getCategory().subscribe({
      next: data => {
        this.Categories = data;
        // this.datasource = new MatTableDataSource<ISite>(data);
        // this.datasource.paginator = this.paginator;
        // this.datasource.sort = this.sort;
        console.log(this.Categories);
      }
    })
  }

  next() {
    this.slickModal.slickNext();
  }
  prev() {
    this.slickModal.slickPrev();
  }

}
