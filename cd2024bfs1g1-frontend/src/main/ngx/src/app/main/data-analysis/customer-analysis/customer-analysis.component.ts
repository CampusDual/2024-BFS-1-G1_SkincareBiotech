import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { OTranslateService, OntimizeService } from 'ontimize-web-ngx';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-analysis',
  templateUrl: './customer-analysis.component.html',
  styleUrls: ['./customer-analysis.component.css']
})
export class CustomerAnalysisComponent implements OnInit, OnDestroy {

  multi: any[] = [];
  view: any[] = [900, 500];

  selectedXAxis: string = 'GENDER';
  selectedYAxis: string = 'AGE_RANGE';

  service: OntimizeService;
  translateSubscription: Subscription;

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
  ) {
    this.service = this.injector.get(OntimizeService);
    this.translate = this.injector.get(OTranslateService);
  }

  ngOnInit(): void {
    this.updateAxisLabels();
    this.fetchCustomerData();

    this.translateSubscription = this.translate.onLanguageChanged.subscribe(() => {
      this.updateAxisLabels();
      this.transformDataToHeatMap(this.rawData);
    });
  }

  ngOnDestroy(): void {
    if (this.translateSubscription) {
      this.translateSubscription.unsubscribe();
    }
  }

  rawData: any[] = [];

  fetchCustomerData(): void {
    const conf = this.service.getDefaultServiceConfiguration('billed-ages');
    this.service.configureService(conf);
    this.service.query({}, ["GENDER", "AGE_RANGE", "SKIN_TYPE", "USER_COUNT"], "customerAgeGenderAndSkin")
      .subscribe((data) => {
        if (data.data.length > 0) {
          this.rawData = data.data;
          this.transformDataToHeatMap(this.rawData);
        }
      });
  }

  transformDataToHeatMap(data: any[]): void {
    const groupedData = {};

    data.forEach(item => {
      const rawXAxisValue = item[this.selectedXAxis];
      const rawYAxisValue = item[this.selectedYAxis];
      const userCount = item.USER_COUNT;

      const translatedXAxisValue = this.translate.get(rawXAxisValue);
      const translatedYAxisValue = this.translate.get(rawYAxisValue);

      if (!groupedData[translatedXAxisValue]) {
        groupedData[translatedXAxisValue] = {};
      }

      if (!groupedData[translatedXAxisValue][translatedYAxisValue]) {
        groupedData[translatedXAxisValue][translatedYAxisValue] = 0;
      }

      groupedData[translatedXAxisValue][translatedYAxisValue] += userCount;
    });

    this.multi = Object.keys(groupedData).map(xAxisValue => {
      return {
        name: xAxisValue,
        series: Object.keys(groupedData[xAxisValue]).map(yAxisValue => {
          return {
            name: yAxisValue,
            value: groupedData[xAxisValue][yAxisValue]
          };
        })
      };
    });
  }

  updateAxisLabels(): void {
    this.xAxisLabel = this.translate.get(this.selectedXAxis);
    this.yAxisLabel = this.translate.get(this.selectedYAxis);
  }
}
