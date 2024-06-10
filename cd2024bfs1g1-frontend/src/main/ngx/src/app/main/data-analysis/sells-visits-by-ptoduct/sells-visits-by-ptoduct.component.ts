import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import moment from 'moment';
import { Expression, FilterExpressionUtils, ODateRangeInputComponent, OIntegerInputComponent, OntimizeService, OTableBase, OTableComponent } from 'ontimize-web-ngx';
import { ChartService, DiscreteBarChartConfiguration, OChartComponent } from 'ontimize-web-ngx-charts';
import { buildDriverProvider } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-sells-visits-by-ptoduct',
  templateUrl: './sells-visits-by-ptoduct.component.html',
  styleUrls: ['./sells-visits-by-ptoduct.component.css']
})
export class SellsVisitsByPtoductComponent implements AfterViewInit {
  data: any[];
  dataSales: any[];
  barParameters: DiscreteBarChartConfiguration;
  colors = {};
  numberOfProducts: number = 3;
  selectedDates: any = {};
  @ViewChild('viewsTable') viewsTable: OTableComponent;
  @ViewChild('salesTable') salesTable: OTableComponent;
  @ViewChild('inputNumProducts') inputNumProducts: OIntegerInputComponent;
  @ViewChild('inputDate') inputDate: ODateRangeInputComponent;
  @ViewChild('inputDateSales') inputDateSales: ODateRangeInputComponent;
  constructor(
    protected service: OntimizeService,

  ) {
    this.selectedDates = this.setDefaultDates();
    this._barConfiguration();
  }
  ngAfterViewInit(): void {
    this.viewsTable.queryRows = this.numberOfProducts;
    this.viewsTable.reloadData();
    this.salesTable.reloadData();
  }
  _barConfiguration() {
    this.barParameters = new DiscreteBarChartConfiguration();
    this.barParameters.showLegend = true;
    this.colors = {
      domain: ['#31d4f8', '#2aaecb', '#1f6e9a', '#154865', '#0499ec', '#03649b', '#03649b']
    };
  }

  loadChart(event: any) {
    this.data = event.map(key => {
      return {
        name: key.PRO_NAME,
        value: key.N_VIEWS
      };
    });
  }
  loadChartSales(event: any) {
    this.dataSales = event.map(key => {
      return {
        name: key.PRO_NAME,
        value: key.TOTAL_SALES
      };
    });
  }

  filter(values: Array<{ attr, value }>): Expression {
    let filters: Array<Expression> = [];
    values.forEach(fil => {
      if (fil.value) {
        if (fil.attr == 'VISIT_DATE') {
          filters.push(FilterExpressionUtils.buildExpressionMoreEqual(fil.attr, fil.value.startDate.toDate()));
          filters.push(FilterExpressionUtils.buildExpressionLessEqual(fil.attr, fil.value.endDate.toDate()));

        }
        if (fil.attr === 'CAT_ID') {
          filters.push(FilterExpressionUtils.buildExpressionEquals(fil.attr, fil.value));
        }
        if (fil.attr === 'BRA_ID') {
          filters.push(FilterExpressionUtils.buildExpressionEquals(fil.attr, fil.value));
        }
        if (fil.attr === 'PGE_ID') {
          filters.push(FilterExpressionUtils.buildExpressionEquals(fil.attr, fil.value));
        }
      }
    });

    if (filters.length > 0) {
      return filters.reduce((exp1, exp2) => FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND));
    } else {
      return null;
    }
  }
  filterSales(values: Array<{ attr, value }>): Expression {
    let filters: Array<Expression> = [];
    values.forEach(fil => {
      if (fil.value) {
        if (fil.attr == 'SALES_DATE') {
          filters.push(FilterExpressionUtils.buildExpressionMoreEqual(fil.attr, fil.value.startDate.toDate()));
          filters.push(FilterExpressionUtils.buildExpressionLessEqual(fil.attr, fil.value.endDate.toDate()));

        }
        if (fil.attr === 'CAT_ID') {
          filters.push(FilterExpressionUtils.buildExpressionEquals(fil.attr, fil.value));
        }
        if (fil.attr === 'BRA_ID') {
          filters.push(FilterExpressionUtils.buildExpressionEquals(fil.attr, fil.value));
        }
        if (fil.attr === 'PGE_ID') {
          filters.push(FilterExpressionUtils.buildExpressionEquals(fil.attr, fil.value));
        }
      }
    });

    if (filters.length > 0) {
      return filters.reduce((exp1, exp2) => FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND));
    } else {
      return null;
    }
  }
  setDefaultDates() {
    const defaultDates = this.getCurrentAndWeekAgoDates();
    return {
      startDate: moment(defaultDates.weekAgoDate),
      endDate: moment(defaultDates.currentDate)
    }
  }
  updateNoP(e) {
    this.reloadProducts(e.newValue)
  }
  updateSalesNoP(e) {
    this.reloadProducts(e.newValue)
  }
  reloadProducts(n) {
    this.viewsTable.queryRows = n;
    this.viewsTable.reloadData();
  }
  refreshChart() {
    this.viewsTable.clearFilters();
    this.inputNumProducts.setValue(this.numberOfProducts);
    this.reloadProducts(this.numberOfProducts);

  }
  getCurrentAndWeekAgoDates() {
    const currentDate = new Date();
    const weekAgoDate = new Date();

    weekAgoDate.setDate(currentDate.getDate() - 7);

    const formatDate = (date) => {
      return date.toISOString();
    };

    const currentDateString = formatDate(currentDate);
    const pastDateString = formatDate(weekAgoDate);

    return {
      currentDate: currentDateString,
      weekAgoDate: pastDateString
    };
  }


}
