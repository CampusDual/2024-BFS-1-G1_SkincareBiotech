import { Component, Injector, ViewChild } from '@angular/core';
import { OntimizeService } from 'ontimize-web-ngx';
import { OChartComponent, ChartService, DiscreteBarChartConfiguration } from 'ontimize-web-ngx-charts';



@Component({
  selector: 'app-data-analysis-home',
  templateUrl: './data-analysis-home.component.html',
  styleUrls: ['./data-analysis-home.component.css']
})

export class DataAnalysisHomeComponent {
  public chartParameters: DiscreteBarChartConfiguration;

  constructor() {
    this.chartParameters = new DiscreteBarChartConfiguration();
    this.chartParameters.showYAxis= true;
    this.chartParameters.showXAxis= true;
    this.chartParameters.showLegend= true;
    this.chartParameters.showValues= false;
    this.chartParameters.margin.left= 50;
  }

}
