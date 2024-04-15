import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  error = '';
  success = '';
  loading = false;

  constructor(private _auth: AuthService, private _router: Router) {}

  // LoginComponent
  ngOnInit(): void {
    this.success = localStorage.getItem('successMessage');
    localStorage.removeItem('successMessage'); // Clear the message so it doesn't show again on refresh
    if (this.success) {
      setTimeout(() => this.success = '', 5000);
    }
  }
  


  onSubmit(): void {
    this.loading = true;
    this.error = '';
    if (!this.email || !this.password) {
      this.error = 'Make sure to fill everything ;)';
      this.loading = false; // Stop loading since there was an error
    } else {
      this._auth
        .login(this.email, this.password) // Adjust the login method to pass two arguments instead of an object
        .subscribe(
          (res) => {
            this.loading = false;
            this._router.navigate(['/']); // Redirect to home page upon successful login
          },
          (err) => {
            console.log(err);
            this.error = err.error.error || 'An error occurred during login.'; // Display specific error message from the server
            this.loading = false;
          }
        );
    }
}


  canSubmit(): boolean {
    return this.email.length > 0 && this.password.length > 0;
  }
}
