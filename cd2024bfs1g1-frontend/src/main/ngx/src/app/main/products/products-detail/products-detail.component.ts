import { Component, Inject, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OCurrencyInputComponent, OSlideToggleComponent, OntimizeService } from 'ontimize-web-ngx';
import { DiscreteBarChartConfiguration, OChartComponent } from 'ontimize-web-ngx-charts';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})
export class ProductsDetailComponent implements OnInit{

  @ViewChild('discreteBar', { static: false })
  protected discreteBar: OChartComponent;

  @ViewChild('realPriceCurrency') 
  realPriceCurrency : OCurrencyInputComponent;

  public chartParameters: DiscreteBarChartConfiguration;
  data: any;
  intermedio: any;
  id:any;
  isVisible: boolean = false;
  Visible:boolean = true;

  service: OntimizeService;

  commissionPlataform: number;
  commissionRedSys: number;

  public priceUser: number;

  constructor(
    protected injector: Injector,
    private router: Router,
    private route: ActivatedRoute,

  ) {

    this.chartParameters = new DiscreteBarChartConfiguration();
    this.chartParameters.showYAxis = true;
    this.chartParameters.showXAxis = true;
    this.chartParameters.showLegend = true;
    this.chartParameters.showValues = false;
    this.chartParameters.margin.left = 50;
    this.service = this.injector.get(OntimizeService);
  }
  
  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
    this.Visible = !this.Visible;
  }
  ngOnInit(){
    const conf = this.service.getDefaultServiceConfiguration('commissions');
      this.service.configureService(conf);
      this.service.query({}, ["COM_NAME","COM_VALUE"], "commission")
        .subscribe((data) => {
          if (data.data.length > 0) {
            this.commissionRedSys = data.data.find((element) => (element.COM_NAME === "Redsys_commissions")).COM_VALUE;            
            this.commissionPlataform = data.data.find((element) => (element.COM_NAME === "Plataform_commissions")).COM_VALUE;
          }
        })
  }

  onUpdate(success: boolean) {
    if (success) {
      this.router.navigate(['/main/products']);
    }
  }
  onDataLoaded(event) {
  }
  onInsert(event) {
    this.router.navigate(['/main/products']);
  }

  changePrice(event) {
    this.realPriceCurrency.setValue(event);
    this.priceUser = (this.realPriceCurrency.getValue() / (1 - (this.commissionPlataform / 100))) / (1 - (this.commissionRedSys / 100));
    this.realPriceCurrency.setValue(this.priceUser);  
  }

}
