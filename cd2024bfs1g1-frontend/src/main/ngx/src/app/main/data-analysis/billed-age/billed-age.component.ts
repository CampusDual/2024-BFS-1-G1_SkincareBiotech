import { Component, ViewChild } from '@angular/core';
import { DataAdapterUtils, PieChartConfiguration, OChartComponent } from 'ontimize-web-ngx-charts';
import { OntimizeService } from 'ontimize-web-ngx';


@Component({
  selector: 'app-billed-age',
  templateUrl: './billed-age.component.html',
  styleUrls: ['./billed-age.component.css']
})
export class BilledAgeComponent {

  @ViewChild('ageAndGender')
  protected ageAndGender: OChartComponent

  
  data2: any[];
  chartParameters: PieChartConfiguration;
  service: OntimizeService;


  // Billed age
  minAge: number;
  maxAge: number;
  maxBilledByAge: number;
  totalBilled: number;
  percentage: number;
  isBilledAgeData: boolean;

  //Billed age&gender
  minAge2: number;
  maxAge2: number;
  maxBilledByAgeAndGender: [string, number];
  man: PersonData;
  woman: PersonData;
  pna: PersonData;
  other: PersonData;
  percentage2: number;
  isAgeGenderData: boolean;

  colorScheme = {
    domain: ['#31d4f8', '#2aaecb', '#1f6e9a', '#154865', '#0499ec', '#03649b', '#03649b']
  };

  constructor() {
    this.chartParameters = new PieChartConfiguration();
    this.chartParameters.labelType = 'key';
    this.chartParameters.legend.margin.top = 5;
    this.chartParameters.legend.margin.bottom = 5;
    this.chartParameters.legendPosition = 'right';
    
  }
  

  loadBilledAge(event: any) {
    this.initializeBilledAgeParams();
    this.groupDataByAgeRange(event, 'AGE_RANGE', 'TOTAL');
    this.calculateBilledAgeStatistics(event);

    this.percentage = ((this.maxBilledByAge / this.totalBilled) * 100);
  }


  loadAGeGender(event: any) {
    const genres = ['MAN', 'WOMAN', 'PNA', 'OTHER']
    this.minAge2 = 0;
    this.maxAge2 = 0;
    this.maxBilledByAgeAndGender = ['', 0];

    
    this.isAgeGenderData = false;

    const groupedData = event.reduce((acc, item) => {
      if (!acc[item.AGE_RANGE]) {
        acc[item.AGE_RANGE] = {
          MAN: 0,
          WOMAN: 0,
          PNA: 0,
          OTHER: 0
        };
      }
     
      acc[item.AGE_RANGE]['WOMAN'] += item.WOMAN;
      acc[item.AGE_RANGE]['PNA'] += item.PNA;
      acc[item.AGE_RANGE]['OTHER'] += item.OTHER;
      this.isAgeGenderData = true;
      return acc;
    }, {});

    this.data2 = Object.keys(groupedData).map(key => {
      return {
        name: key,
        series: [
          {
            name: "MAN",
            value: groupedData[key].MAN
          },
          {
            name: "WOMAN",
            value: groupedData[key].WOMAN
          },
          {
            name: "PNA",
            value: groupedData[key].PNA
          },
          {
            name: "OTHER",
            value: groupedData[key].OTHER
          }
        ]
      };
    });

    this.man = {
      gender: "MAN",
      total: 0,
      minAge: 0,
      maxAge: 0
    };
    this.woman = {
      gender: "WOMAN",
      total: 0,
      minAge: 0,
      maxAge: 0
    };
    this.other = {
      gender: "OTHER",
      total: 0,
      minAge: 0,
      maxAge: 0
    };
    this.pna = {
      gender: "PNA",
      total: 0,
      minAge: 0,
      maxAge: 0
    };
    for (let ageRange2 in event) {
      console.log(event[ageRange2])
      if (event[ageRange2].MAN > this.man) {
        this.man = event[ageRange2].MAN;
        this.minAge = event[ageRange2].GBA_MIN_AGE;
        this.maxAge = event[ageRange2].GBA_MAX_AGE;

      }
      this.totalBilled += event[ageRange2].TOTAL;
    }
    console.log(this.maxBilledByAgeAndGender);
    this.percentage2 = ((this.maxBilledByAgeAndGender[1] / this.totalBilled) * 100);
  }

  private initializeBilledAgeParams() {
    this.minAge = 0;
    this.maxAge = 0;
    this.maxBilledByAge = 0;
    this.totalBilled = 0;
    this.isBilledAgeData = false;
  }

  private groupDataByAgeRange(data: any[], ageRangeKey: string, valueKey: string){
   return data.reduce((acc, item) => {
      if (!acc[item[ageRangeKey]]) {
        acc[item[ageRangeKey]] = 0;
      }
      acc[item[ageRangeKey]] += item[valueKey];
      this.isAgeData = true;
      return acc;
    }, {});
  }

  private calculateBilledAgeStatistics(data: any[]) {
    data.forEach(item => {
      if (item.TOTAL > this.maxBilledByAge) {
        this.maxBilledByAge = item.TOTAL;
        this.minAge = item.GBA_MIN_AGE;
        this.maxAge = item.GBA_MAX_AGE;
      }
      this.totalBilled += item.TOTAL;
    });
  }
  
}

interface PersonData {
  gender: string;
  total: number;
  minAge: number;
  maxAge: number;
}

