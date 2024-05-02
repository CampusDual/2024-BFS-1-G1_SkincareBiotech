import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntimizeWebModule } from 'ontimize-web-ngx';

import { PublicRoutingModule } from './public-routing.module';
import { SharedModule } from '../shared/shared.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PublicComponentComponent } from './public-component/public-component.component';



@NgModule({
  declarations: [
    PublicComponentComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PublicRoutingModule,
    OntimizeWebModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class PublicModule { }
