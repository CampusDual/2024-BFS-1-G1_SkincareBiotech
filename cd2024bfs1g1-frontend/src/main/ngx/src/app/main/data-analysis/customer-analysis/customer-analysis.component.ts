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

  selectedXAxis: string = 'gender'; 
  selectedYAxis: string = 'age'; 

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
    this.fetchCustomerData();
  }

  fetchCustomerData(): void {
    const conf = this.service.getDefaultServiceConfiguration('billed-ages');
    this.service.configureService(conf);
    this.service.query({}, ["GENDER", "AGE_RANGE", "SKIN_TYPE", "USER_COUNT"], "customerAgeGenderAndSkin")
      .subscribe((data) => {
        if (data.data.length > 0) {
          this.transformDataToHeatMap(data.data);
        }
      });
  }

  transformDataToHeatMap(data: any[]): void {
    const groupedData = {};

    data.forEach(item => {
      const xAxisValue = item[this.getFieldName(this.selectedXAxis)];
      const yAxisValue = item[this.getFieldName(this.selectedYAxis)];
      const userCount = item.USER_COUNT;

      if (!groupedData[xAxisValue]) {
        groupedData[xAxisValue] = {};
      }

      if (!groupedData[xAxisValue][yAxisValue]) {
        groupedData[xAxisValue][yAxisValue] = {
          name: yAxisValue,
          value: 0
        };
      }

      groupedData[xAxisValue][yAxisValue].value += userCount;
    });

    this.multi = Object.keys(groupedData).map(xAxisValue => {
      return {
        name: xAxisValue,
        series: Object.values(groupedData[xAxisValue])
      };
    });

    this.updateAxisLabels();
  }

  getFieldName(selectedField: string): string {
    switch (selectedField) {
      case 'gender':
        return 'GENDER';
      case 'age':
        return 'AGE_RANGE';
      case 'skin':
        return 'SKIN_TYPE';
      default:
        return '';
    }
  }

  updateAxisLabels(): void {
    this.xAxisLabel = this.translate.get(this.getFieldName(this.selectedXAxis));
    this.yAxisLabel = this.translate.get(this.getFieldName(this.selectedYAxis));
  }
}
