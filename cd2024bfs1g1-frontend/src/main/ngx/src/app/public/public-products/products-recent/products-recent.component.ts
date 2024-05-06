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
      "PRO_PRICE",
      "PRO_IMAGE"
    ];
    const filter = { "PRO_ENABLED": true };
    const order = [{ "columnName": "PRO_ID", "ascendent": false }]
    this.service.advancedQuery(filter, columns, "product", null, 0, 5, order)
      .subscribe((data) => {
        if (data.data.length > 0) {
          this.prodList = data.data;
        }
      })
  }

  public getImageSrc(base64: any): any {
    return base64 ? this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + base64) : './assets/images/no-image.png';
  }

}
