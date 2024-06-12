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

  maxDate: number;
  maxDay: number;
  maxMonth: string;
  totalBilled: number = 0;
  isGraph: boolean = true;
  maxAmount: number = 0;
  percentage: number;

  constructor() {
  }

  loadDataAnalysis(event: any){
    event.forEach(item => {
      this.totalBilled += item.AMOUNT_PRICE;
      if(item.AMOUNT_PRICE > this.maxAmount){
        this.maxAmount = item.AMOUNT_PRICE;
        this.maxDate = item.ORD_DATE;
      }
    })
 
    this.formatDate(this.maxDate);
    this.percentage = ((this.maxAmount / this.totalBilled) * 100);
  }

  private formatDate(date: number){
    const newDate = new Date(date);
    this.maxDay = newDate.getDate();
    const monthFormatter = new Intl.DateTimeFormat('es-ES', { month: 'long' });
    this.maxMonth = monthFormatter.format(newDate);
    
  }

}
