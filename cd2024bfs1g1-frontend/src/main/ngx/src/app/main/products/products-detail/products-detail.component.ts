import { Component, Inject, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OCurrencyInputComponent, OFormComponent, OSlideToggleComponent, OntimizeService } from 'ontimize-web-ngx';
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
  @ViewChild('form') form: OFormComponent;

  public chartParameters: DiscreteBarChartConfiguration;
  data: any;
  intermedio: any;
  id:any;
  isVisible: boolean = false;
  Visible:boolean = true;
  product: any;
  service: OntimizeService;
  public commissionPlataform: number;
  public commissionRedSys: number;
  public priceUser: number;
  productName: string = '';
  isDataLoaded: boolean = false;

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
            this.isDataLoaded = true;
          }
        })
        
        let id = parseInt(this.route.snapshot.paramMap.get('PRO_ID'))
        const conf2 = this.service.getDefaultServiceConfiguration('products');
          this.service.configureService(conf2);
          this.service.query({ "PRO_ID": id }, ["PRO_ID", "PRICE", "SALE_PRICE", "REAL_PRICE", "PRO_SALE"], "product")
            .subscribe((data) => {
              if (data.data.length > 0) {
                this.product = data.data[0];
              }
            })
  }

  onUpdate(success: boolean) {
    if (success) {
      this.router.navigate(['/main/products']);
    }
  }
  onInsert(event) {
    this.router.navigate(['/main/products']);
  }

  changePrice(event) {
    if(!event){
      this.priceUser = 0;
    }else{
      this.priceUser = (event / (1 - (this.commissionPlataform / 100))) / (1 - (this.commissionRedSys / 100));
    }
  }

  onSelectedTabChange(){
    this.router.navigate(['/main/products/:PRO_ID/allergen']);
  }

  checkName($event: any){
    this.productName = $event.PRO_NAME;
  }

  finalPriceSale(rowData: Array<any>): number {
    
    return (rowData['SAL_PRICE'] / (1 - (this.commissionPlataform / 100))) / (1 - (this.commissionRedSys / 100));
  }
  getPriceCalculator(){
    let self = this;
    return (row)=>{
      return  self.finalPriceSale(row)
    }
  }
}
