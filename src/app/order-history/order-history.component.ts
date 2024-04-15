import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  user: any;
  orders: any[] = [];
  error = '';
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _product: ProductService,
    private router: Router
  ) {
    this.user = this._auth.getUser();
  }

  ngOnInit(): void {

    //console.log(this.user.id)
    if (!this.user) {
      console.error('User not found');
      this.router.navigate(['/login']); // Redirect to login if user not found
      return;
    }
  
    this._api.getTypeRequest(`/orders?userId=${this.user.id}`).subscribe(
      (res: any) => {
        this.orders = res.data;
      },
      (err) => {
        // Handle the error response from the server
        if (err.error && err.error.message) {
          this.error = err.error.message;
          console.log(this.error);
        } else {
          // If the error structure is unknown, provide a generic message
          this.error = 'An unexpected error occurred.';
          console.log(this.error);
        }
      }
    );
  }
  
}
