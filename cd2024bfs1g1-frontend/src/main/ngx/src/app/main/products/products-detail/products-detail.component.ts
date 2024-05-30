import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OCurrencyInputComponent, OSlideToggleComponent, OntimizeService } from 'ontimize-web-ngx';
import { ChartService, OChartComponent } from 'ontimize-web-ngx-charts';

declare var d3: any;

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})
export class ProductsDetailComponent {

  @ViewChild ("proSaleToggle")
  proSaleToggle : OSlideToggleComponent;

  @ViewChild ("proSaleCurrency")
  proSaleCurrency : OCurrencyInputComponent;

  protected data: Array<Object>;

  protected yAxis: string = 'MOVEMENT';
  protected xAxis: string = 'MOVEMENTTYPES';

  @ViewChild('discreteBar', {static: false})
  protected discreteBar: OChartComponent;
  injector: any;


  constructor(
    private router: Router
  ) { }

  onUpdate(success: boolean) {
    if (success) {
      this.router.navigate(['/main/products']);
    } 
  }

  onDataLoaded(event){
   
    this.proSaleToggle.setValue((event.PRO_SALE !== undefined));
    this.proSaleCurrency.setEnabled((event.PRO_SALE !== undefined));
  }

  onInsert(event){
    this.router.navigate(['/main/products']);
  }

  onChange(event){
    if(!this.proSaleToggle.getValue()){
      this.proSaleCurrency.setValue(null);
    }
  
    this.proSaleCurrency.setEnabled(this.proSaleToggle.getValue());
  }

  ngAfterViewInit() {
    // Configuring Ontimize service instance...
    let service: OntimizeService = this.injector.get(OntimizeService);
    /*
    * 'getDefaultServiceConfiguration' method provides session, endpoint,.. data from
    * application configuration object.
    */
    let conf = service.getDefaultServiceConfiguration();
    conf['entity'] = 'EMovementTypes';
    service.configureService(conf);

    // Performing ontimize query...
    let filter = {
      'ACCOUNTID': 7310
    };
    let columns = ['MOVEMENT', 'MOVEMENTTYPES'];
    service.query(filter, columns).subscribe((resp) => {
      // response ok
      if (resp.code === 0) {
        this.adaptResult(resp.data);
      } else {
        alert('Impossible to query data!');
      }
    });

    let chartService: ChartService = this.discreteBar.getChartService();
    let chartOps = chartService.getChartOptions();
    // Configuring x axis...
    chartOps['yAxis']['tickFormat'] = function (d) {
      return d3.format(',f')(d) + '€';
    };

  }

  /**
   * Creates chart data grouping movements by category 'Movement type'
   *  */
  adaptResult(data: Array<any>) {
    if (data && data.length) {
      let values = this.processValues(data);
      // chart data
      this.data = [
        {
          'key': 'Discrete serie',
          'values': values
        }
      ]
    }
  }

  processValues(data: Array<Object> ) : Array<Object> {
    let values = [];
    var self = this;
    data.forEach((item: any, index: number) => {
      let filtered = self.filterCategory(item[self.xAxis], values);
      if (filtered && filtered.length === 0) {
        let val = {
          'x': item[self.xAxis],
          'y': item[self.yAxis]
        };
        values.push(val);
      } else {
        filtered[0]['y'] += item[self.yAxis];
      }
    });
    return values;
  }

  filterCategory(category: string, values: Array<Object>) {
    let filtered = [];
    if (values && values.length) {
      filtered = values.filter((val: Object) => {
        if (val['x'] === category) {
          return true;
        }
      });
    }
    return filtered;
  }

}
