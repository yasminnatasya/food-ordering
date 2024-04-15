import { Component, OnInit, HostListener } from '@angular/core';
import { FoodService } from '../services/food.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  foods: any[] = [];
  loading = false;
  screenWidth: any;
  screenHeight: any;
  additionalLoading = false;
  selectedCategory: string = '';
  
  // The categories array can be filled with actual data fetched from an API or can be static if it doesn't change
  categories: any[] = [
    { name: 'Pizza' },
    { name: 'Salad' },
    { name: 'Burger' },
    { name: 'Pasta' },
    // Add more categories as needed
  ];

  constructor(private foodService: FoodService, private cartService: CartService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }

  ngOnInit(): void {
    this.onResize(event); // Call onResize to set initial screenWidth and screenHeight
    this.loading = true;
    this.foodService.getAllFoods().subscribe(
      (res: any) => {
        console.log('Data received from API:', res);
        this.foods = res.data; // Make sure this matches your API response structure
        this.loading = false;
      },
      (err) => {
        console.error(err);
        this.loading = false;
      }
    );
  }

  // Method to filter foods by category
filterFoodsByCategory(category: string): void {
  this.selectedCategory = category;
  this.loading = true;
  // If you want to display all foods when no specific category is selected, you can have an option to reset the filter
  if (category === 'All') {
    this.foodService.getAllFoods().subscribe(
      (res: any) => {
        this.foods = res.data;
        this.loading = false;
      },
      (err) => {
        console.error(err);
        this.loading = false;
      }
    );
  } else {
    this.foodService.getFoodsByCategory(category).subscribe(
      (res: any) => {
        this.foods = res.data; // This should be the filtered list of foods by category
        this.loading = false;
      },
      (err) => {
        console.error(err);
        this.loading = false;
      }
    );
  }
}

  onAddToCart(food): void {
    this.cartService.addProduct(food); // Use the addProduct method from CartService
  }

  showMoreProducts(): void {
    this.additionalLoading = true;
    // Implement logic to fetch more products and add to the foods array
    // For example, you might need to increment a pageNumber and fetch the next page
    // this.foodService.getMoreFoods(pageNumber).subscribe(...);
    // After fetching, set this.additionalLoading to false
  }
}
