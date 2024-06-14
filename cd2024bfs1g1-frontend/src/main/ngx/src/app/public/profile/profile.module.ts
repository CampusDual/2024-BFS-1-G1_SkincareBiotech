import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { OrdersModule } from '../orders/orders.module';
import { ProfileAllergenUserComponent } from './profile-allergen-user/profile-allergen-user.component';



@NgModule({
  declarations: [
    ProfileHomeComponent,
    ProfileAllergenUserComponent,

  ],
  imports: [
    CommonModule,
    OntimizeWebModule,
    ProfileRoutingModule,
    OrdersModule
  ]
})
export class ProfileModule { }
