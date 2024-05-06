import { Component, Inject, Injector, OnInit } from '@angular/core';
import { OntimizeService } from 'ontimize-web-ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  service: OntimizeService;
  product: any = null;

  constructor(
    protected injector: Injector,
    protected sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.service = this.injector.get(OntimizeService)
  }

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('prod_id'))
    const conf = this.service.getDefaultServiceConfiguration('products');
    this.service.configureService(conf);
    this.service.query({ "PRO_ID": id }, ["PRO_ID", "PRO_NAME", "PRO_DESCRIPTION", "PRO_PRICE", "PRO_IMAGE", "PRO_SALE"], "productEnabled")
      .subscribe((data) => {
        if (data.data.length > 0) {
          this.product = data.data[0];
        } else {
          this.router.navigate(['']);
        }
      })
  }

  public getImageSrc(base64: any): any {
    return base64 ? this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + base64) : './assets/images/no-image.png';
  }

  get price() {
    return this.product.PRO_PRICE?.toFixed(2);
  }
  get sale() {
    return this.product.PRO_SALE?.toFixed(2);
  }

  createOrder(): void {

    this.router.navigate(["/order", this.product.PRO_ID]);

  }

}
