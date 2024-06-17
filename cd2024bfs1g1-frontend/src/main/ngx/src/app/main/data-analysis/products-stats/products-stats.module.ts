import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsStatsHomeComponent } from './products-stats-home/products-stats-home.component';
import { SalesChartComponent } from './sales-chart/sales-chart.component';
import { VisitsChartComponent } from './visits-chart/visits-chart.component';
import { ProductsStatsRoutingModule } from './products-stats-routing.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { OChartModule } from 'ontimize-web-ngx-charts';



@NgModule({
  declarations: [
    ProductsStatsHomeComponent,
    SalesChartComponent,
    VisitsChartComponent
  ],
  imports: [
    CommonModule,
    OntimizeWebModule,
    ProductsStatsRoutingModule,
    OChartModule
  ]
})
export class ProductsStatsModule { }
