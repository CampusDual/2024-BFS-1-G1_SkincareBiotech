import { Component, ViewChild } from '@angular/core';
import { PieChartConfiguration, OChartComponent } from 'ontimize-web-ngx-charts';
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


  ageRangeKey = 'AGE_RANGE';
  isGraph: boolean = true;

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
  percentage2: number;
  isAgeGenderData: boolean;
  genres = ['MAN', 'WOMAN', 'PNA', 'OTHER'];

  colorScheme = {
    domain: ['#31d4f8', '#2aaecb', '#1f6e9a', '#154865', '#0499ec', '#03649b', '#03649b']
  };

  constructor() {
    this.chartParameters = new PieChartConfiguration();
    this.chartParameters.legendPosition = 'right';
  }

  loadBilledAge(event: any) {
    this.initializeBilledAgeParams();
    this.calculateBilledAgeStatistics(event);
  }

  loadAgeGender(event: any) {
    this.initializeBilledAgeGenderParams();
    this.calculateBilledAgeAndGenderStatistics(event);
  }

  private initializeBilledAgeParams() {
    this.minAge = 0;
    this.maxAge = 0;
    this.maxBilledByAge = 0;
    this.totalBilled = 0;
    this.isBilledAgeData = false;
    this.isGraph = true;
  }

  private initializeBilledAgeGenderParams() {
    this.minAge2 = 0;
    this.maxAge2 = 0;
    this.maxBilledGenre = '';
    this.isAgeGenderData = false;
    this.maxBilledGenreTotal = 0;
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

    if(this.totalBilled <=0){
      this.isGraph = false;
    }

    this.percentage = ((this.maxBilledByAge / this.totalBilled) * 100);
  }

  private calculateBilledAgeAndGenderStatistics(data: any[]) {
    data.forEach(item => {
      this.genres.forEach(genre => {
        if (item[genre] > this.maxBilledGenreTotal) {
          this.maxBilledGenreTotal = item[genre]
          this.maxBilledGenre = genre;
          this.minAge2 = item.GBA_MIN_AGE;
          this.maxAge2 = item.GBA_MAX_AGE;
        }
      });
    });

      if(this.totalBilled <=0){
      this.isGraph = false;
    }
    
    this.percentage2 = ((this.maxBilledGenreTotal / this.totalBilled) * 100);
  }
}