import { Component, Injector, OnInit } from '@angular/core';
import { OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  service : OntimizeService;
  product :any = {};
  constructor(protected injector: Injector) {
    this.service = this.injector.get(OntimizeService);
  }

  ngOnInit(): void {
    const conf = this.service.getDefaultServiceConfiguration('products');
  this.service.configureService(conf);
    this.service.query({ "PRO_ID": 1 }, ["PRO_NAME", "PRO_PRICE"], "product")
      .subscribe((data) => {
        console.log(data);
        this.product=data.data[0];
      })
  }

}
