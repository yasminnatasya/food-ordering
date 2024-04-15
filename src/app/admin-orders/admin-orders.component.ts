import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders = [];
  filteredOrders = [];
  searchTerm = '';
  error = '';

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.getUser()) {
      this.router.navigate(['/login']);
    } else {
      this.loadOrders();
    }
  }

  loadOrders() {
    this.apiService.getTypeRequest('orders').subscribe({
      next: (res: any) => {
        this.orders = res.data.map(order => ({ ...order, isEditable: false }));
        this.filteredOrders = this.orders;
      },
      error: (err) => this.error = err.error.message || 'An error occurred while fetching orders.'
    });
  }

  toggleEdit(order) {
    order.isEditable = !order.isEditable;
  }

  updateOrder(order) {
    console.log(order); // Add this line to log the order object
    this.apiService.putTypeRequest(`orders/${order.order_id}`, order).subscribe({
      next: (res) => {
        this.loadOrders(); // Refresh the orders list
      },
      error: (err) => {
        console.error(err); // Log any errors to understand what might be wrong
        this.error = err.error.message || 'Failed to update order.'
      }
    });
}


  deleteOrder(orderId) {
    this.apiService.deleteTypeRequest(`/orders/${orderId}`).subscribe({
      next: (res) => this.loadOrders(), // Refresh the orders list
      error: (err) => this.error = err.error.message || 'Failed to delete order.'
    });
  }

  searchOrders() {
    this.filteredOrders = this.orders.filter(order =>
      order.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
