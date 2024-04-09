import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { HomeUsersComponent } from './home/home.component';
import { DetailUsersComponent } from './detail/detail.component';
import { SharedModule } from '../../../shared/shared.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';


@NgModule({
  declarations: [HomeUsersComponent, DetailUsersComponent],
  imports: [
    CommonModule,
    SharedModule,
    OntimizeWebModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
