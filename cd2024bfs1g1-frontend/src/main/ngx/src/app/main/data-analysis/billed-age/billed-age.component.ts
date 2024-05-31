import { Component } from '@angular/core';
import { PieChartConfiguration } from 'ontimize-web-ngx-charts';
import { MultiBarHorizontalChartConfiguration } from 'ontimize-web-ngx-charts';
import { MultiBarChartConfiguration } from 'ontimize-web-ngx-charts';

@Component({
  selector: 'app-billed-age',
  templateUrl: './billed-age.component.html',
  styleUrls: ['./billed-age.component.css']
})
export class BilledAgeComponent {

  data: Array<Object>;
  protected serviceResponse: string;

  chartParameters:MultiBarChartConfiguration;
  chartParameters2: PieChartConfiguration;

  // colorScheme = {
  //   domain: ['#7ec0ee', '#40e0d0', '#003366', '#4682b4']
  // };

  constructor() {
    this.chartParameters2 = new PieChartConfiguration();
    this.chartParameters2.labelType = 'value';
    this.chartParameters2.legend.margin.top = 5;
    this.chartParameters2.legend.margin.bottom = 5;
    this.chartParameters2.legendPosition = 'right';
    this.chartParameters = new MultiBarChartConfiguration();
    this
  }

}