import { Component } from '@angular/core';
import { PieChartConfiguration } from 'ontimize-web-ngx-charts';

@Component({
  selector: 'app-billed-age',
  templateUrl: './billed-age.component.html',
  styleUrls: ['./billed-age.component.css']
})
export class BilledAgeComponent {

  chartParameters: PieChartConfiguration;

  colorScheme = {
    domain: ['#31d4f8', '#2aaecb', '#1f6e9a', '#154865', '#0499ec', '#03649b', '#03649b']
  };

  constructor() {
    this.chartParameters = new PieChartConfiguration();
    this.chartParameters.labelType = 'value';
    this.chartParameters.legend.margin.top = 5;
    this.chartParameters.legend.margin.bottom = 5;
    this.chartParameters.legendPosition = 'right';
  }

}