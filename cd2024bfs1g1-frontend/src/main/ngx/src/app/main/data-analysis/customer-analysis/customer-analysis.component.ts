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
    domain: ['#000080', '#000094', '#0000a4', '#0000b4', '#0000c4', '#0000d4', '#0000e4', '#0000f4', '#0004ff', '#0014ff', '#0024ff', '#0034ff', '#0044ff', '#0054ff', '#0064ff', '#0074ff', '#0084ff', '#0094ff', '#00a4ff', '#00b4ff', '#00c4ff', '#00d4ff', '#00e8ff', '#00f8ff', '#0afff6', '#1affe6', '#2affd6', '#3affc6', '#4affb6', '#5affa6', '#6aff96', '#7aff86', '#8aff76', '#9aff66', '#aaff56', '#baff46', '#caff36', '#daff26', '#eaff16', '#faff06', '#fff400', '#ffe400', '#ffd400', '#ffc000', '#ffb000', '#ffa000', '#ff9000', '#ff8000', '#ff7000', '#ff6000', '#ff5000', '#ff4000', '#ff3000', '#ff2000', '#ff1000', '#ff0000', '#f00000', '#e00000', '#d00000', '#c00000', '#b00000', '#a00000', '#900000', '#800000']
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
