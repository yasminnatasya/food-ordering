import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from '../services/food.service';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

// import Swiper core and required components
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
} from 'swiper/core';
import { CartService } from '../services/cart.service';

// install Swiper components
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
]);

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  id: number;
  product: any; // This will store the food data
  quantity: number = 1; // Default quantity
  showcaseImages: any[] = [];
  loading = false;
  sanitizedImageUrl: SafeUrl;

  constructor(
    private _route: ActivatedRoute,
    private foodService: FoodService,
    private _cart: CartService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this._route.paramMap
      .pipe(
        map((param: any) => {
          return param.params.id;
        })
      )
      .subscribe((foodId) => {
        this.id = parseInt(foodId);
        this.foodService.getFood(foodId).subscribe((res) => {
          if(res && res.data) {
            this.product = res.data;
            const imageUrl = `http://localhost/food-ordering-backend/public/uploads/${this.product.image}`;
            this.sanitizedImageUrl = this.sanitizer.bypassSecurityTrustUrl(imageUrl);
            if (this.product.images) {
              this.showcaseImages = this.product.images.split(';');
            }
            this.loading = false;
          } else {
            console.error('No data found for this food item');
            this.loading = false;
          }
        });
      });
  }

  addToCart(): void {
    if (this.quantity > 0) {
      this._cart.addProduct({
        id: this.id,
        price: this.product.price,
        quantity: this.quantity,
        image: this.product.image,
        title: this.product.title
      });
    }
  }
}
