import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  screenHeight: any;
  screenWidth: any;
  isMenuOpen = false;
  isMobile = false;
  isLoggedIn = false;
  dropdownVisible = false;
  cartData: any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    if (this.screenWidth > 768) this.isMobile = false;
    else this.isMobile = true;
  }

  constructor(
    private _token: TokenStorageService,
    private _auth: AuthService,
    private _cart: CartService,
    private _router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.getScreenSize();
    this._auth.user.subscribe((user) => {
      this.isLoggedIn = !!user; // Update isLoggedIn based on user state
    });
    this._cart.cartDataObs$.subscribe((cartData) => {
      this.cartData = cartData;
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this._auth.getUser(); 
  }
  // In your HeaderComponent class
  getSanitizedImageUrl(image: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(`http://localhost/food-ordering-backend/public/uploads/${image}`);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  removeProductFromCart(id: number) {
    this._cart.removeProduct(id);
  }

  logout() {
    this._auth.logout();
    this.isMenuOpen = false;
  }
}
