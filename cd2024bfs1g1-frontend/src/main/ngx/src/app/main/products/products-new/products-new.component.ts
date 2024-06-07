import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OCurrencyInputComponent, OSlideToggleComponent, OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-products-new',
  templateUrl: './products-new.component.html',
  styleUrls: ['./products-new.component.css']
})
export class ProductsNewComponent implements OnInit{

  @ViewChild('realPriceCurrency') 
  realPriceCurrency : OCurrencyInputComponent;

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
  }

  onInsert(success: boolean) {
    if (success) {
      this.router.navigate(['/main/products']);
    }
  }

  changePrice(event) {
    this.realPriceCurrency.setValue(event);
    this.priceUser = (this.realPriceCurrency.getValue() / (1 - (this.commissionPlataform / 100))) / (1 - (this.commissionRedSys / 100));
    this.realPriceCurrency.setValue(this.priceUser);  
  }

}
