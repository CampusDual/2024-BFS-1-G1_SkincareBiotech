import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { HomeRolesComponent } from './home/home.component';
import { DetailRolesComponent } from './detail/detail.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [HomeRolesComponent, DetailRolesComponent],
  imports: [
    CommonModule,
    SharedModule,
    OntimizeWebModule,
    RolesRoutingModule
  ]
})
export class RolesModule { }
