import { Component, Injector, ViewChild } from '@angular/core';
import { OntimizeService } from 'ontimize-web-ngx';
import { OChartComponent, ChartService, DiscreteBarChartConfiguration, PieChartConfiguration } from 'ontimize-web-ngx-charts';



@Component({
  selector: 'app-data-analysis-home',
  templateUrl: './data-analysis-home.component.html',
  styleUrls: ['./data-analysis-home.component.css']
})

export class DataAnalysisHomeComponent {
  public chartParameters: PieChartConfiguration;

  constructor() {
  }

}
