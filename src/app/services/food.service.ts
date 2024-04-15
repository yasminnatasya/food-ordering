import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// This base URL will be the route to your Slim PHP API for food items
const baseFoodUrl = "http://localhost:8080/foods";

@Injectable({
  providedIn: 'root'
})
export class FoodService {
 
  constructor(private http: HttpClient) { }
  
  // Get all food items
  getAllFoods(): Observable<any> {
    return this.http.get<any>(baseFoodUrl);
  }

  // Get a single food item by id
  getFood(id: any): Observable<any> {
    return this.http.get(`${baseFoodUrl.replace('foods', 'food')}/${id}`);
  }

  // Add a method for fetching foods by category
  getFoodsByCategory(category: string): Observable<any> {
    const url = `${baseFoodUrl}?category=${encodeURIComponent(category)}`;
    return this.http.get<any>(url);
  }
  
}
