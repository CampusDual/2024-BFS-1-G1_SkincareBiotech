import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { CommissionsRoutingModule } from './comissions-routing.module';
import { CommissionsHomeComponent } from './commissions-home/commissions-home.component';
import { CommissionDetailComponent } from './commission-detail/commission-detail.component';

@NgModule({
  declarations: [CommissionsHomeComponent, CommissionDetailComponent],
  imports:[
    CommonModule,
    SharedModule,
    OntimizeWebModule,
    CommissionsRoutingModule
  ]
})
export class CommissionsModule { }
