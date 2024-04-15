import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  currentUser: any;
  currentStep = 1;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCode: string;
  cartData: any;
  products: any;
  loading = false;
  successMessage = '';
  customerName: string;
  tableNumber: number;
  orderId;

  constructor(private _auth: AuthService, private _cart: CartService, private sanitizer: DomSanitizer, private router: Router) {
    this._auth.user.subscribe((user) => {
      console.log('Logged in user:', user);
      if (user) {
        this.currentUser = user;
      }
    });

    this._cart.cartDataObs$.subscribe((cartData) => {
      this.cartData = cartData;
    });
  }

  ngOnInit(): void {}

  getSanitizedImageUrl(image: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(`http://localhost/food-ordering-backend/public/uploads/${image}`);
  }

  submitCheckout() {
    this.loading = true;
    const userId = this.currentUser?.id;
  
    if (!userId) {
      console.error('User ID is undefined');
      // Handle the error appropriately, perhaps by showing an error message to the user.
      this.loading = false;
      return;
    }

    this.products = JSON.parse(JSON.stringify(this.cartData.products));
    
    // Call the CartService to submit the checkout data
    this._cart.submitCheckout(userId, this.customerName, this.tableNumber, this.cartData)
    .subscribe(
      (res: any) => {
        // Handle success
        this.orderId = res.orderId;
        this.currentStep = 4;
        this._cart.clearCart();
      },
      (err) => {
        // Handle error
        console.error(err);
      }
    ).add(() => {
      this.loading = false;
    });
}

// finishOrder() {
//   this._cart.clearCart();
//   this.router.navigate(['/']);  // Or wherever you want to redirect
// }


  getProgressPrecent() {
    return (this.currentStep / 4) * 100;
  }

  canCustomerInfoSubmit(): boolean {
    return this.customerName && this.tableNumber ? true : false;
  }

  submitCustomerInfo(): void {
    // Logic to handle the submission of customer name and table number
    this.nextStep();
  }
  
  submitPayment(): void {
    this.nextStep();
  }

  canPaymentSubmit(): boolean {
    return this.cardNumber && this.cardName && this.cardExpiry && this.cardCode
      ? true
      : false;
  }

  nextStep(): void {
    this.currentStep += 1;
    localStorage.setItem('checkoutStep', this.currentStep.toString());
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep -= 1;
      localStorage.setItem('checkoutStep', this.currentStep.toString());
    }
  }

}
