import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { DataAnalysisRoutingModule } from './data-analysis-routing.module';
import { OChartModule } from 'ontimize-web-ngx-charts';
import { DataAnalysisHomeComponent } from './data-analysis-home/data-analysis-home.component';
import { BilledAgeComponent } from './billed-age/billed-age.component';
import { BilledAgeRangeNewComponent } from './billed-age/billed-age-range-new/billed-age-range-new.component';
import { SellsByCategoryComponent } from './sells-by-category/sells-by-category.component';
import { CustomerPredominanceComponent } from './customer-predominance/customer-predominance.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    DataAnalysisHomeComponent,
    BilledAgeComponent,
    BilledAgeRangeNewComponent,
    SellsByCategoryComponent,
    CustomerPredominanceComponent
  ],
  imports: [
    CommonModule,
    DataAnalysisRoutingModule,
    OntimizeWebModule,
    OChartModule,
    NgxChartsModule
  ]
})
export class DataAnalysisModule { }
