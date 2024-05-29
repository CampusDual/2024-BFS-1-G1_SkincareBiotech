import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellersRoutingModule } from './sellers-routing.module';
import { NewSellerComponent } from './new-seller/new-seller.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { SellerDetailsComponent } from './seller-details/seller-details.component';


@NgModule({
  declarations: [
    NewSellerComponent,
    SellerDetailsComponent
  ],
  imports: [
    CommonModule,
    SellersRoutingModule,
    OntimizeWebModule
  ]
})
export class SellersModule { }


