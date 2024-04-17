import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private tokenService: TokenStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const currentUser = this.tokenService.getUser();
    console.log("Current User:", currentUser); // Log to verify user data

    if (!currentUser) {
      // Not logged in so redirect to login page
      return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }

    // Check if route is restricted by role
    if (route.data.roles && route.data.roles.includes('admin') && !currentUser.isAdmin) {
      // If the user role is not authorized for this route, redirect to the home page
      return this.router.createUrlTree(['/']); // Redirect to home page or any other appropriate page
    }

    // User is authorized, so return true
    return true;
  }
}
