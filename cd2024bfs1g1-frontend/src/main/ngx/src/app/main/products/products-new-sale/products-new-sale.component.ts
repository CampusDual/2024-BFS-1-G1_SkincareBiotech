import { Component, Inject, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-products-new-sale',
  templateUrl: './products-new-sale.component.html',
  styleUrls: ['./products-new-sale.component.css']
})

export class ProductsNewSaleComponent implements OnInit {

  data: any;
  intermedio: any;
  id:any;
  isVisible: boolean = false;
  Visible:boolean = true;
  product: any;

  service: OntimizeService;

  commissionPlataform: number;
  commissionRedSys: number;

  public priceUser: number;

  constructor(
    protected injector: Injector,
  ) {
    this.service = this.injector.get(OntimizeService);
  }

  ngOnInit() {
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

  changePrice(event) {
    if(!event){
      this.priceUser = 0;
    }else{
      this.priceUser = (event / (1 - (this.commissionPlataform / 100))) / (1 - (this.commissionRedSys / 100));
    }
  }

}
