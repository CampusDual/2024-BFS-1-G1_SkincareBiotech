import { Component, Inject, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OCurrencyInputComponent, OFormComponent, OSlideToggleComponent, OntimizeService } from 'ontimize-web-ngx';
import { DiscreteBarChartConfiguration, OChartComponent } from 'ontimize-web-ngx-charts';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})

export class ProductsDetailComponent implements OnInit {

  @ViewChild('discreteBar', { static: false })
  protected discreteBar: OChartComponent;

  @ViewChild('realPriceCurrency')
  realPriceCurrency: OCurrencyInputComponent;
  @ViewChild('form') form: OFormComponent;

  public chartParameters: DiscreteBarChartConfiguration;
  data: any;
  intermedio: any;
  id: any;
  isVisible: boolean = false;
  Visible: boolean = true;
  product: {};
  service: OntimizeService;
  public commissionPlatform: number;
  public commissionRedSys: number;
  public priceUser: number;
  productName: string = '';
  isDataLoaded: boolean = false;
  priceSaleUser: any = false;

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
  ngOnInit() {
    const conf = this.service.getDefaultServiceConfiguration('commissions');
    this.service.configureService(conf);
    this.service.query({}, ["COM_NAME", "COM_VALUE"], "commission")
      .subscribe((data) => {
        if (data.data.length > 0) {
          this.commissionRedSys = data.data.find((element) => (element.COM_NAME === "Redsys_commissions")).COM_VALUE;
          this.commissionPlatform = data.data.find((element) => (element.COM_NAME === "Platform_commissions")).COM_VALUE;
          this.isDataLoaded = true;
        }
      })
  }

  onUpdate(success: boolean) {
    if (success) {
      this.router.navigate(['/main/products']);
    }
  }

  changePrice(event) {
    if (!event) {
      this.priceUser = 0;
    } else {
      this.priceUser = (event / (1 - (this.commissionPlatform / 100))) / (1 - (this.commissionRedSys / 100));
    }
  }

  checkName($event: any) {
    this.product = $event;
    this.priceSaleUser = $event.PRO_SALE;
    this.productName = $event.PRO_NAME;
  }

  finalPriceSale(rowData: Array<any>): number {
    return (rowData['SAL_PRICE'] / (1 - (this.commissionPlatform / 100))) / (1 - (this.commissionRedSys / 100));
  }
  getPriceCalculator() {
    let self = this;
    return (row) => {
      return self.finalPriceSale(row)
    }
  }
}
