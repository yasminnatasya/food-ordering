import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form'; // Import NzFormModule
import { NzMessageModule } from 'ng-zorro-antd/message'; // Import NzMessageModule
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { AdminRegistrationComponent } from './components/admin-registration/admin-registration.component';

@NgModule({
  declarations: [
    AdminRegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NzButtonModule,
    NzFormModule,
    NzMessageModule,
    NzInputModule,
    NzDropDownModule,
    NzIconModule,
    NzAlertModule,
    NzInputNumberModule,
    NzSpinModule,
    NzNotificationModule,
    NzProgressModule,
  ]
})
export class AuthModule {}
