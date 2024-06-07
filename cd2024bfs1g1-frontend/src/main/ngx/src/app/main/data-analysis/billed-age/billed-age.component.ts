import { Component } from '@angular/core';
import { PieChartConfiguration } from 'ontimize-web-ngx-charts';
import { OntimizeService } from 'ontimize-web-ngx';


@Component({
  selector: 'app-billed-age',
  templateUrl: './billed-age.component.html',
  styleUrls: ['./billed-age.component.css']
})
export class BilledAgeComponent {

  data: any[];
  chartParameters: PieChartConfiguration;
  service: OntimizeService;

  minAge: number;
  maxAge: number;
  maxBilledByAge: number;
  totalBilled: number;
  percentage: number;
  isData: boolean;

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

  loadChart(event: any) {
    this.minAge=0;
    this.maxAge=0;
    this.maxBilledByAge=0;
    this.totalBilled=0;
    this.isData = false;
    const groupedData = event.reduce((acc, item) => {
      if (!acc[item.AGE_RANGE]) {
        acc[item.AGE_RANGE] = 0;
      }
      acc[item.AGE_RANGE] += item.TOTAL;
      this.isData=true;
      return acc;
    }, {});

    this.data = Object.keys(groupedData).map(key => {
      return {
        name: key,
        value: groupedData[key]
      };
    });
    for (let ageRange in event) {
      console.log(event[ageRange])
      if (event[ageRange].TOTAL > this.maxBilledByAge) {
        this.maxBilledByAge = event[ageRange].TOTAL;
        this.minAge = event[ageRange].GBA_MIN_AGE;
        this.maxAge = event[ageRange].GBA_MAX_AGE;
      }
      this.totalBilled += event[ageRange].TOTAL;
    }
    console.log(this.maxBilledByAge);
    console.log(this.totalBilled);
    this.percentage = ((this.maxBilledByAge / this.totalBilled) * 100);
  }

}
