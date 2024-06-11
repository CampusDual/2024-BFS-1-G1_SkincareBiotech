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
  maxBilledGenre: string;
  maxBilledGenreTotal: number;
  totalBilled2: number;
  man: PersonData;
  woman: PersonData;
  pna: PersonData;
  other: PersonData;
  percentage2: number;
  isAgeGenderData: boolean;
  genres = ['MAN', 'WOMAN', 'PNA', 'OTHER'];

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

    
  }


  loadAGeGender(event: any) {

    this.initializeBilledAgeGenderParams();
    this.groupDataByAgeRangeAndGender(event, this.genres, 'AGE_RANGE');
    this.calculateBilledAgeAndGenderStatistics(event);
   
  }

  private initializeBilledAgeParams() {
    this.minAge = 0;
    this.maxAge = 0;
    this.maxBilledByAge = 0;
    this.totalBilled = 0;
    this.isBilledAgeData = false;
  }

  private initializeBilledAgeGenderParams() {
    this.minAge2 = 0;
    this.maxAge2 = 0;
    this.maxBilledGenre = '';
    this.isAgeGenderData = false;
    this.maxBilledGenreTotal = 0;
  }

  private groupDataByAgeRange(data: any[], ageRangeKey: string, valueKey: string) {
    return data.reduce((acc, item) => {
      if (!acc[item[ageRangeKey]]) {
        acc[item[ageRangeKey]] = 0;
      }
      acc[item[ageRangeKey]] += item[valueKey];
      this.isBilledAgeData = true;
      return acc;
    }, {});
  }

  private groupDataByAgeRangeAndGender(data: any[], genres: string[], ageRangeKey: string) {
    return data.reduce((acc, item) => {
      if (!acc[item[ageRangeKey]]) {
        acc[item[ageRangeKey]] = {};
        genres.forEach(genre => {
          acc[item[ageRangeKey]][genre] = 0;
        });
      }
      genres.forEach(genre => {
        acc[item[ageRangeKey]][genre] += item[genre];
      })
      this.isAgeGenderData = true;
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
    this.percentage = ((this.maxBilledByAge / this.totalBilled) * 100);
  }

  private calculateBilledAgeAndGenderStatistics(data:any[]){
    let maxBilled = 0;
      data.forEach(item => {
      this.genres.forEach(genre => {
        if (item[genre] > maxBilled) {
          maxBilled = item[genre];
          this.maxBilledGenreTotal = maxBilled;
          this.maxBilledGenre = genre;
          this.minAge2 = item['GBA_MIN_AGE'];
          this.maxAge2 = item['GBA_MAX_AGE'];
        }
      });
    });
    this.percentage2 = ((this.maxBilledGenreTotal / this.totalBilled) * 100);
  }
}

interface PersonData {
  gender: string;
  total: number;
  minAge: number;
  maxAge: number;
}

