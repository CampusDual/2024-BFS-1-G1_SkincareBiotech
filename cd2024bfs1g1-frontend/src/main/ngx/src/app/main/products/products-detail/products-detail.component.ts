import { Component, Injector, OnInit, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OCurrencyInputComponent, OSlideToggleComponent, OntimizeService, OntimizeService } from 'ontimize-web-ngx';
import { DiscreteBarChartConfiguration, OChartComponent } from 'ontimize-web-ngx-charts';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})
export class ProductsDetailComponent implements OnInit{

  @ViewChild("proSaleToggle")
  proSaleToggle: OSlideToggleComponent;

  @ViewChild("proSaleCurrency")
  proSaleCurrency: OCurrencyInputComponent;

  @ViewChild('discreteBar', { static: false })
  protected discreteBar: OChartComponent;

  @ViewChild("proPriceCurrency")
  proPriceCurrency: OCurrencyInputComponent;

  public chartParameters: DiscreteBarChartConfiguration;
  service: any;
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
      this.priceUser = 0;
  }

  onUpdate(success: boolean) {
    if (success) {
      this.router.navigate(['/main/products']);
    }
  }
  onDataLoaded(event) {
    this.proSaleToggle.setValue((event.PRO_SALE !== undefined));
    this.proSaleCurrency.setEnabled((event.PRO_SALE !== undefined));
  }
  onInsert(event) {
    this.router.navigate(['/main/products']);
  }
  onChange(event) {
    if (!this.proSaleToggle.getValue()) {
      this.proSaleCurrency.setValue(null);
    }
    this.proSaleCurrency.setEnabled(this.proSaleToggle.getValue());
  }
  onInputChanged(event){
    if (!this.proSaleToggle.isChecked()) {
      this.priceUser = (this.proPriceCurrency.getValue() / (1 - (this.commissionPlataform / 100))) / (1 - (this.commissionRedSys / 100));
      this.proPriceCurrency.readOnly = false;
    } else {
      this.priceUser = (this.proSaleCurrency.getValue() / (1 - (this.commissionPlataform / 100))) / (1 - (this.commissionRedSys / 100));
      this.proPriceCurrency.readOnly = true;
    }
  }

}
