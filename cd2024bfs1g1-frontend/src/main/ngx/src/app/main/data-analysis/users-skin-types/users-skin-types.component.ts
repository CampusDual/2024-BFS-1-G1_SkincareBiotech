import { Component, OnInit } from '@angular/core';
import { PieChartConfiguration } from 'ontimize-web-ngx-charts';

@Component({
  selector: 'app-users-skin-types',
  templateUrl: './users-skin-types.component.html',
  styleUrls: ['./users-skin-types.component.css']
})
export class UsersSkinTypesComponent implements OnInit {

    pieParameters: PieChartConfiguration;
    colors = {};

  constructor() { 
    this._pieConfiguration();
  }
  _pieConfiguration() {
    this.pieParameters = new PieChartConfiguration();
    this.pieParameters.showLeyend = false;
    this.pieParameters.legendPosition = 'right';
    this.colors = {
      domain: ['#31d4f8', '#2aaecb', '#1f6e9a', '#154865', '#0499ec', '#03649b', '#03649b']
    };
    }

  ngOnInit() {
  }

}
