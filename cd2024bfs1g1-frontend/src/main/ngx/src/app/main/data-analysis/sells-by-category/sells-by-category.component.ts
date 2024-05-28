import { Component, OnInit } from '@angular/core';
import { OntimizeService } from 'ontimize-web-ngx';
import { OChartComponent, ChartService, DiscreteBarChartConfiguration } from 'ontimize-web-ngx-charts';

@Component({
  selector: 'app-sells-by-category',
  templateUrl: './sells-by-category.component.html',
  styleUrls: ['./sells-by-category.component.css']
})
export class SellsByCategoryComponent implements OnInit {

  public chartParameters: DiscreteBarChartConfiguration;

  constructor() { }

  ngOnInit() {
  }

}
