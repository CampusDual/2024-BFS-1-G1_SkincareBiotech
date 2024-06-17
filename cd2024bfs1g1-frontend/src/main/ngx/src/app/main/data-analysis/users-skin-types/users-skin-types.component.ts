import { Component, Injector, OnInit } from '@angular/core';
import { PieChartConfiguration } from 'ontimize-web-ngx-charts';
import { LanguageService } from 'src/app/shared/services/language.service';


@Component({
  selector: 'app-users-skin-types',
  templateUrl: './users-skin-types.component.html',
  styleUrls: ['./users-skin-types.component.css']
})
export class UsersSkinTypesComponent implements OnInit {

    pieParameters: PieChartConfiguration;
    colors = {};

    totalUsers: number;
    maxSkin: string;
    usersMaxSkin: number;
    percentage: number;

  constructor(
    protected injector: Injector,
    protected languageService: LanguageService,
  ) { 
    this._pieConfiguration();
    this.languageService.getLanguage();
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

  loadDataAnalysis(event:any){
    this.totalUsers=0;
    this.usersMaxSkin=0;

    event.forEach(item => {
      this.totalUsers += item.TOTAL;
      if(item.TOTAL > this.usersMaxSkin){
        this.maxSkin = item.SKIN_NAME;
        this.usersMaxSkin = item.TOTAL;
      }
      this.percentage = ((this.usersMaxSkin / this.totalUsers ) * 100);
    });
  }


}