import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  constructor(private _api: ApiService, private _token: TokenStorageService, private _router: Router,  private _cart: CartService) {
    this.userSubject = new BehaviorSubject<any>(this._token.getUser());
    this.user = this.userSubject.asObservable();
  }

  
  getUser() {
    console.log(this.userSubject);
    console.log(this.userSubject.value);
    return this.userSubject.value;
  }


login(email: string, password: string): Observable<any> {
  return this._api.postTypeRequest('/login', { email, password }).pipe(
    map((res: any) => {
      if (res.token) {
        console.log("Received user data:", res.user);  // Log the received user data

        // Explicitly check if isAdmin is "1" or 1
        const isAdmin = res.user.isAdmin === 1 || res.user.isAdmin === "1";
        console.log("User isAdmin status:", isAdmin);  // Log the correctly interpreted isAdmin status

        this._token.setToken(res.token);
        this._token.setUser({ ...res.user, isAdmin: isAdmin });
        this.userSubject.next({ ...res.user, isAdmin: isAdmin });

        const redirectRoute = isAdmin ? '/adminOrder' : '/';
        console.log("Redirecting to:", redirectRoute); // Confirm redirection path
        this._router.navigate([redirectRoute]);
      }
      return res;
    })
  );
}

  
  register(user: { name: string; email: string; password: string; phone?: string; address?: string, isAdmin?: number; }): Observable<any> {
    return this._api.postTypeRequest('/register', user).pipe(
      map((res: any) => {
        // After successful registration, navigate to the login page
        this._router.navigate(['/login'], { state: { message: 'Registration successful!' } });
        return res;
      })
    );
  }
  

  logout() {
    localStorage.removeItem('cart');
    this._token.clearStorage();
    this._cart.clearCart();
    this.userSubject.next(null);
    this._router.navigate(['/login']);
  }

}
