import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OCurrencyInputComponent, OSlideToggleComponent, OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-products-new',
  templateUrl: './products-new.component.html',
  styleUrls: ['./products-new.component.css']
})
export class ProductsNewComponent implements OnInit{

  @ViewChild("proSaleToggle")
  proSaleToggle: OSlideToggleComponent;

  @ViewChild("proSaleCurrency")
  proSaleCurrency: OCurrencyInputComponent;

  @ViewChild("proPriceCurrency")
  proPriceCurrency: OCurrencyInputComponent;

  service: OntimizeService;

  commissionPlataform: number;
  commissionRedSys: number;

  public priceUser: number;

  constructor(
    private router: Router,
    protected injector: Injector
  ) {
    this.service = this.injector.get(OntimizeService)
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
  onInsert(success: boolean) {
    if (success) {
      this.router.navigate(['/main/products']);
    }
  }

  onChange(event) {
    if (!this.proSaleToggle.isChecked()) {
      this.proSaleCurrency.readOnly = true;
      this.proSaleCurrency.setValue(null);
      this.proPriceCurrency.readOnly = false;
    } else {
      this.proSaleCurrency.readOnly = false;
      this.proSaleCurrency.enabled = this.proSaleToggle.getValue();     
      this.proPriceCurrency.readOnly = true;
    }
  }

  onInputChanged(event){
    if (!this.proSaleToggle.isChecked()) {
      this.priceUser = (this.proPriceCurrency.getValue() / (1 - (this.commissionPlataform / 100))) / (1 - (this.commissionRedSys / 100));
    } else {
      this.priceUser = (this.proSaleCurrency.getValue() / (1 - (this.commissionPlataform / 100))) / (1 - (this.commissionRedSys / 100));
    }
  }
}
