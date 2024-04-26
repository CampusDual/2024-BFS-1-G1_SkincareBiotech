import { Component, Injector, OnInit } from '@angular/core';
import { OntimizeService } from 'ontimize-web-ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  service: OntimizeService;
  product: any = {};
  constructor(
    protected injector: Injector,
    protected sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {
    this.service = this.injector.get(OntimizeService)
  }

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('prod_id'))
    const conf = this.service.getDefaultServiceConfiguration('products');
    this.service.configureService(conf);
    this.service.query({ "PRO_ID": id }, ["PRO_NAME", "PRO_DESCRIPTION", "PRO_PRICE", "PRO_IMAGE"], "product")
      .subscribe((data) => {
        console.log(data);
        this.product = data.data[0];
      })
  }

  public getImageSrc(base64: any): any {
    return base64 ? this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + base64) : './assets/images/no-image.png';
  }

}
