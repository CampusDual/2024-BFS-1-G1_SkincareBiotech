import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OntimizeWebModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
