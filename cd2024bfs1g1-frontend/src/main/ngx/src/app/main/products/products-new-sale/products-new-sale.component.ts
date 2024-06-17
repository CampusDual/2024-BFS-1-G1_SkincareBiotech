import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  commissionPlatform: number;
  commissionRedSys: number;

  public priceUser: number;

  constructor(
    protected injector: Injector,
    private router: Router,  
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
            this.commissionPlatform = data.data.find((element) => (element.COM_NAME === "Platform_commissions")).COM_VALUE;
          }
        })
  }

  changePrice(event) {
    if(!event){
      this.priceUser = 0;
    }else{
      this.priceUser = (event / (1 - (this.commissionPlatform / 100))) / (1 - (this.commissionRedSys / 100));
    }
  }

}
