import { Component, Inject, Injector, OnInit } from '@angular/core';
import { AuthService, OTranslateService, OUserInfoService, OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-customer-predominance',
  templateUrl: './customer-predominance.component.html',
  styleUrls: ['./customer-predominance.component.css']
})
export class CustomerPredominanceComponent implements OnInit {
  multi: any[] = [];
  view: any[] = [700, 300];

  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Gender';
  yAxisLabel: string = 'Age Range';

  colorScheme = {
    domain: ['#313695', '#4575B4', '#74ADD1', '#ABD9E9', '#E0F3F8', '#FFFFBF', '#FEE090', '#FDAE61', '#F46D43', '#D73027', '#A50026']
  };

  service: OntimizeService;

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
      const gender = item.GENDER;
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
