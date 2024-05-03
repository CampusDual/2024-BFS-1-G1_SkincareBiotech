import { Component, Injector, OnInit } from '@angular/core';
import { OntimizeService } from 'ontimize-web-ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-products-recent',
  templateUrl: './products-recent.component.html',
  styleUrls: ['./products-recent.component.scss']
})
export class ProductsRecentComponent implements OnInit {

  service: OntimizeService;
  prodList: any = null;
  constructor(
    protected injector: Injector,
    protected sanitizer: DomSanitizer
  ){
    this.service = this.injector.get(OntimizeService)
  }

  ngOnInit() {
    const conf = this.service.getDefaultServiceConfiguration('products');
    this.service.configureService(conf);
    this.service.advancedQuery({},["PRO_ID", "PRO_NAME", "PRO_DESCRIPTION", "PRO_PRICE", "PRO_IMAGE"],"product",
      {"pro_price": 2,"pro_enabled": -7,"pro_id": 4,
      "pro_image": 12,"cat_id": 4, "pro_description": 12,
      "pro_sale": 2,"pro_name": 12},
      0,5,[{"columnName":"PRO_ID", "ascendent": false}])
        .subscribe((data) => {
        if(data.data.length > 0) {
          this.prodList = data;
        }
      })
  }

  public getImageSrc(base64: any): any {
    return base64 ? this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + base64) : './assets/images/no-image.png';
  }

}
