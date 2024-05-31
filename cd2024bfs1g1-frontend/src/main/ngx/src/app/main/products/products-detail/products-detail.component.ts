import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OCurrencyInputComponent, OSlideToggleComponent, OntimizeService } from 'ontimize-web-ngx';
import { DiscreteBarChartConfiguration, OChartComponent } from 'ontimize-web-ngx-charts';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})
export class ProductsDetailComponent  {

  @ViewChild("proSaleToggle")
  proSaleToggle: OSlideToggleComponent;

  @ViewChild("proSaleCurrency")
  proSaleCurrency: OCurrencyInputComponent;

  @ViewChild('discreteBar', { static: false })
  protected discreteBar: OChartComponent;

  public chartParameters: DiscreteBarChartConfiguration;
  service: any;
  data: any;
  intermedio: any;
  id:any;
  isVisible: boolean = false;
  Visible:boolean = true;

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
}
