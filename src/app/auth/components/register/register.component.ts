import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  phone = ''; // New property for phone number
  address = ''; 
  errorMessage = '';
  loading = false;
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.errorMessage = '';
    if (this.fullName && this.email && this.password && this.confirmPassword) {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords need to match';
      } else {
        this.loading = true;
        // Adjust this call to match the expected signature
        this._auth.register({
          name: this.fullName,
          email: this.email,
          password: this.password,
          phone: this.phone,
          address: this.address
        }).subscribe(
          (res) => {
            console.log(res);
            this.loading = false;
            localStorage.setItem('successMessage', 'Registration successful!');
            this._router.navigate(['/login']);
          },
          (err) => {
            this.errorMessage = err.error.message;
            this.loading = false;
          }
        );
      }
    } else {
      this.errorMessage = 'Make sure to fill everything ;)';
    }
  }

  canSubmit(): boolean {
    // Include phone and address in the canSubmit check if they are required
    return this.fullName && this.email && this.password && this.confirmPassword ? true : false;
  }
}
