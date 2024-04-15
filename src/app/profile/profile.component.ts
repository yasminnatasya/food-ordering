import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user = [
    {
      key: 'fullName',
      label: 'Full name',
      value: '',
      type: 'text',
    },
    {
      key: 'email',
      label: 'Email address',
      value: '',
      type: 'email',
    },
    {
      key: 'password',
      label: 'New Password',
      value: '',
      type: 'password',
    },
    {
      key: 'confirmPassword',
      label: 'Confirm New Password',
      value: '',
      type: 'password',
    },
  ];
  userId = null;
  alertMessage = '';
  alertType = '';
  alertVisible = false;
  loading = false;

  constructor(
    private _api: ApiService,
    private _token: TokenStorageService,
    private _router: Router
  ) {}

  // Update user fields with current details
  ngOnInit(): void {
    const userDetails = this._token.getUser();
    console.log('User Details:', userDetails);  // Debug output
  
    if (userDetails && userDetails.id) {  // Corrected from userDetails.user_id to userDetails.id
      this.userId = userDetails.id;
      this.user.find(u => u.key === 'fullName').value = userDetails.name;
      this.user.find(u => u.key === 'email').value = userDetails.email;
    } else {
      console.error('User details are not available.');
      this._router.navigate(['/login']);
    }
  }
  
  

  canUpdate(): boolean {
    const newPassword = this.user.find(u => u.key === 'password').value;
    const confirmPassword = this.user.find(u => u.key === 'confirmPassword').value;
    return newPassword && confirmPassword && newPassword === confirmPassword;
  }

  // Submit data to be updated
  onSubmit(): void {
    this.alertVisible = false;
    if (!this.userId) {
      this.alertMessage = "User ID is unavailable. Please log in again.";
      this.alertType = 'error';
      this.alertVisible = true;
      return;
    }
    const newPassword = this.user.find(u => u.key === 'password').value;
    const confirmPassword = this.user.find(u => u.key === 'confirmPassword').value;
  
    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      this.alertType = 'error';
      this.alertMessage = 'Passwords do not match';
      this.alertVisible = true;
    } else {
      this.loading = true;
      // API request to update password
      this._api
        .putTypeRequest(`users/${this.userId}/reset-password`, {
          newPassword
        })
        .subscribe(
          (res: any) => {
            console.log(res);
            this.alertMessage = 'Password successfully updated';
            this.alertType = 'success';
            this.alertVisible = true;
            this.loading = false;
            // Clear the password fields
            this.user.find(u => u.key === 'password').value = '';
            this.user.find(u => u.key === 'confirmPassword').value = '';
            // Optionally reload or navigate the user
            window.location.reload();
            // this._router.navigate(['/profile']); // Or wherever you wish to navigate after password reset
          },
          (err: any) => {
            console.log(err);
            this.alertMessage = err.error.message;
            this.alertType = 'error';
            this.alertVisible = true;
            this.loading = false;
          }
        );
    }
  }
  
}
