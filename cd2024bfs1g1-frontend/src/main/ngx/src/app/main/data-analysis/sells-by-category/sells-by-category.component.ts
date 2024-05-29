import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Expression, FilterExpressionUtils, OntimizeService } from 'ontimize-web-ngx';
import { OChartComponent, ChartService, DiscreteBarChartConfiguration } from 'ontimize-web-ngx-charts';
import { ODateRangeInputComponent } from 'ontimize-web-ngx';
import DaterangepickerComponent from 'ontimize-web-ngx/lib/components/input/date-range/o-daterange-picker.component';
import moment from 'moment';

@Component({
  selector: 'app-sells-by-category',
  templateUrl: './sells-by-category.component.html',
  styleUrls: ['./sells-by-category.component.css']
})


export class SellsByCategoryComponent implements OnInit {

  @ViewChild('dateRange') dateRange: ODateRangeInputComponent;
  @ViewChild('pieChart') pieChart: OChartComponent;


  data: any []; 
   public chartParameters: DiscreteBarChartConfiguration;
  service: OntimizeService;


  constructor(
    protected injector: Injector,
  ) {
    this.service = this.injector.get(OntimizeService);
  }

  loadChart(event: any) {
    console.log(event);
    

    this.data =  event.map((item) => { 
          return{
            name: item.CAT_NAME,
            value: item.TOTAL_SOLD
          }
        }) 
    ;
  
    console.log(this.data);
  }

  ngOnInit() {

  }

  filter(values: Array<{ attr, value }>): Expression {
    console.log(values);
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
