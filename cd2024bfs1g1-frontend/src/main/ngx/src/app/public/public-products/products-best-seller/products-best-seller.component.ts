import { Component, OnInit, Injector } from '@angular/core';
import { OntimizeService } from 'ontimize-web-ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-products-best-seller',
  templateUrl: './products-best-seller.component.html',
  styleUrls: ['./products-best-seller.component.css']
})
export class ProductsBestSellerComponent implements OnInit {
  service: OntimizeService;
  prodList: any = [];

  constructor(
    protected injector: Injector,
    protected sanitizer: DomSanitizer
  ) { 
    this.service = this.injector.get(OntimizeService)
  }

  ngOnInit() {
    const conf = this.service.getDefaultServiceConfiguration('products');
    this.service.configureService(conf);
    const columns = [
      "PRO_ID",
      "PRO_NAME",
      "PRO_DESCRIPTION",
      "PRICE",
      "REAL_PRICE",
      "DISCOUNT",
      "PRO_IMAGE",
      "AMMOUNT_OF_SALES"
    ];
    const filter = {};
    const order = [{ "columnName": "AMMOUNT_OF_SALES", "ascendent": false}]
    this.service.advancedQuery(filter, columns, "product", null, 0, 5, order)
      .subscribe((data) => {
        if (data.data.length > 0) {
          this.prodList = data.data;
        }
      })
  }

}
