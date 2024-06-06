import { Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { AuthService, OTranslateService, OUserInfoService, OntimizeService, ServiceResponse } from 'ontimize-web-ngx';

@Component({
  selector: 'app-customer-predominance',
  templateUrl: './customer-predominance.component.html',
  styleUrls: ['./customer-predominance.component.css']
})
export class CustomerPredominanceComponent implements OnInit {
  multi: any[];
  view: any[] = [700, 300];
  rangeData: any = {};

  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  yAxisLabel: string = 'Year';

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  service: OntimizeService;

  constructor(
    protected injector: Injector,
    protected translate: OTranslateService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(OUserInfoService) private oUserInfoService: OUserInfoService,
  ) {
    this.service = this.injector.get(OntimizeService)
    this.translate = this.injector.get(OTranslateService);
    this.multi = [
      {
        "name": "Germany",
        "series": [
          {
            "name": "1990",
            "value": 6200000
          },
          {
            "name": "2010",
            "value": 7300000
          },
          {
            "name": "2011",
            "value": 8940000
          }
        ]
      },
      {
        "name": "USA",
        "series": [
          {
            "name": "1990",
            "value": 2500000
          },
          {
            "name": "2010",
            "value": 7870000
          },
          {
            "name": "2011",
            "value": 8270000
          }
        ]
      },
      {
        "name": "France",
        "series": [
          {
            "name": "1990",
            "value": 5800000
          },
          {
            "name": "2010",
            "value": 5000002
          },
          {
            "name": "2011",
            "value": 5800000
          }
        ]
      },
      {
        "name": "UK",
        "series": [
          {
            "name": "1990",
            "value": 4500000
          },
          {
            "name": "2010",
            "value": 6200000
          },
          {
            "name": "2011",
            "value": 6200000
          }
        ]
      }
    ];
  }

  ngOnInit(): void {
    const conf = this.service.getDefaultServiceConfiguration('customers-predominance');
    this.service.configureService(conf);
    this.service.query({}, ["GENDER", "AGE_RANGE", "USER_COUNT"], "customerAgeAndGender")
      .subscribe((data) => {
        if (data.data.length > 0) {
          this.rangeData = data.data;
          console.log(this.rangeData);
        }
      });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
