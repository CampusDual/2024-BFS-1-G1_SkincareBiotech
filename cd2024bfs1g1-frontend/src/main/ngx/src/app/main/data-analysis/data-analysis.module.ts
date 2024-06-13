import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { DataAnalysisRoutingModule } from './data-analysis-routing.module';
import { OChartModule } from 'ontimize-web-ngx-charts';
import { DataAnalysisHomeComponent } from './data-analysis-home/data-analysis-home.component';
import { BilledAgeComponent } from './billed-age/billed-age.component';
import { SellsByCategoryComponent } from './sells-by-category/sells-by-category.component';
import { UsersSkinTypesComponent } from './users-skin-types/users-skin-types.component';
import { SellsVisitsByPtoductComponent } from './sells-visits-by-ptoduct/sells-visits-by-ptoduct.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { VisitsChartComponent } from './sells-visits-by-ptoduct/visits-chart/visits-chart.component';
import { SalesChartComponent } from './sells-visits-by-ptoduct/sales-chart/sales-chart.component';
import { CustomerAnalysisComponent } from './customer-analysis/customer-analysis.component';


@NgModule({
  declarations: [
    DataAnalysisHomeComponent,
    BilledAgeComponent,
    SellsByCategoryComponent,
    UsersSkinTypesComponent,
    SellsVisitsByPtoductComponent,
    VisitsChartComponent,
    SalesChartComponent,
    CustomerAnalysisComponent
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
