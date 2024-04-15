import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartData: any;

  constructor(private _cart: CartService, private sanitizer: DomSanitizer) {
    this._cart.cartDataObs$.subscribe((cartData) => {
      this.cartData = cartData;
      console.log(cartData);
    });
  }

  ngOnInit(): void {}

  getSanitizedImageUrl(image: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(`http://localhost/food-ordering-backend/public/uploads/${image}`);
  }

  updateCart(id: number, quantity: number): void {
    console.log({ id, quantity });
    this._cart.updateCart(id, quantity);
  }

  removeCartItem(id: number): void {
    this._cart.removeProduct(id);
  }
}
