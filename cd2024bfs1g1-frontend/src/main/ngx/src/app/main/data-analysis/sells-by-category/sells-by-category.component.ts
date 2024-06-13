import { Component, Injector } from '@angular/core';
import { Expression, FilterExpressionUtils, OntimizeService } from 'ontimize-web-ngx';
import { PieChartConfiguration } from 'ontimize-web-ngx-charts';


@Component({
  selector: 'app-sells-by-category',
  templateUrl: './sells-by-category.component.html',
  styleUrls: ['./sells-by-category.component.css']
})

export class SellsByCategoryComponent {

  data: any[];
  service: OntimizeService;
  pieParameters: PieChartConfiguration;
  colors = {};

  catBestSeller: string = '';
  maxCatTotalSold: number = 0;
  totalSold: number = 0;
  percentage: number = 0;

  isData: boolean = false;
 
  constructor(
    protected injector: Injector,
  ) {
    this._pieConfiguration();
    this.service = this.injector.get(OntimizeService);
  }

  _pieConfiguration() {
    this.pieParameters = new PieChartConfiguration();
    this.pieParameters.showLeyend = true;
    this.pieParameters.legendPosition = 'right';
    this.colors = {
      domain: ['#31d4f8', '#2aaecb', '#1f6e9a', '#154865', '#0499ec', '#03649b', '#03649b']
    };
  }

  loadChart(event: any) {
    this.catBestSeller='';
    this.maxCatTotalSold=0;
    this.totalSold=0;
    this.percentage=0;
    this.isData = false;
     const groupedData = event.reduce((acc, item) => {
      if (!acc[item.CAT_NAME]) {
        acc[item.CAT_NAME] = 0;
      }
      acc[item.CAT_NAME] += item.TOTAL_SOLD;
      this.isData=true;
      return acc;
    }, {});

    this.data = Object.keys(groupedData).map(key => {
      return {
        name: key,
        value: groupedData[key]
      };
    });

    for (let category in groupedData) {
      if (groupedData[category] > this.maxCatTotalSold) {
        this.maxCatTotalSold = groupedData[category];
        this.catBestSeller = category;
      }
      this.totalSold += groupedData[category];
    }
    this.percentage = ((this.maxCatTotalSold / this.totalSold) * 100);
  }



  filter(values: Array<{ attr, value }>): Expression {
    let filters: Array<Expression> = [];
    values.forEach(fil => {
      if (fil.value) {
        if (fil.attr == 'ORD_DATE') {
          filters.push(FilterExpressionUtils.buildExpressionMoreEqual(fil.attr, fil.value.startDate.toDate()));
          filters.push(FilterExpressionUtils.buildExpressionLessEqual(fil.attr, fil.value.endDate.toDate()));
        }
      }
    });

    if (filters.length > 0) {
      return filters.reduce((exp1, exp2) => FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND));
    } else {
      return null;
    }
  }

}
