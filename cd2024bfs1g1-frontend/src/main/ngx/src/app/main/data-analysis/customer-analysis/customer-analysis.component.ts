import { Component, Inject, Injector, OnInit } from '@angular/core';
import { AuthService, OTranslateService, OUserInfoService, OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-customer-analysis',
  templateUrl: './customer-analysis.component.html',
  styleUrls: ['./customer-analysis.component.css']
})
export class CustomerAnalysisComponent implements OnInit {

  multi: any[] = [];
  view: any[] = [900, 500];

  selectedField: string = 'gender-age'; 

  service: OntimizeService;

  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string;
  yAxisLabel: string;

  colorScheme = {
    domain: ["#ff0000", "#f66d00", "#ffe800", "#a6d600", "#38ff00"]
  };

  constructor(
    protected injector: Injector,
    protected translate: OTranslateService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(OUserInfoService) private oUserInfoService: OUserInfoService,
  ) {
    this.service = this.injector.get(OntimizeService);
    this.translate = this.injector.get(OTranslateService);
  }

  ngOnInit(): void {

    this.xAxisLabel = this.translate.get('GENDER');
    this.yAxisLabel = this.translate.get('AGE_RANGE');

    const conf = this.service.getDefaultServiceConfiguration('billed-ages');
    this.service.configureService(conf);
    this.service.query({}, ["GENDER", "AGE_RANGE", "USER_COUNT"], "customerAgeAndGender")
      .subscribe((data) => {
        if (data.data.length > 0) {
          this.transformDataToHeatMap(data.data);
        }
      });
  }

  transformDataToHeatMap(data: any[]): void {
    const groupedData = {};

    data.forEach(item => {
      const gender = this.translate.get(item.GENDER); 
      const ageRange = item.AGE_RANGE;
      const userCount = item.USER_COUNT;

      if (!groupedData[gender]) {
        groupedData[gender] = {
          name: gender,
          series: []
        };
      }

      groupedData[gender].series.push({
        name: ageRange,
        value: userCount
      });
    });

    this.multi = Object.values(groupedData);
  }
}
