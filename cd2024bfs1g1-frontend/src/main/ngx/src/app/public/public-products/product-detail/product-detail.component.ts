import { Component, Injector, OnInit } from '@angular/core';
import { OntimizeService } from 'ontimize-web-ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { HashService } from 'src/app/shared/services/hash.service';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  service: OntimizeService;
  service2:OntimizeService;
  product: any = null;
  hash:string;

  constructor(
    protected injector: Injector,
    protected sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private hashService: HashService,
  ) {
    this.service = this.injector.get(OntimizeService);
    this.service2 = this.injector.get(OntimizeService);
  }

  async ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('prod_id'))
    this.hash = await this.hashService.generateUniqueHash();
    this.tracker(id,this.hash);
    this.loadProduct(id);

  }

  public tracker(id,hash){

      const conf = this.service2.getDefaultServiceConfiguration('productsView');
      this.service2.configureService(conf); 
      this.service2.insert({"PROV_UID":hash,"PRO_ID":id},"productView")
      .subscribe(
        (data) => {
          console.log(data);       
        },
        (error) => {
          console.log(error + " ¡algo salió mal!");
        }
      );
  }

  public loadProduct(id){
    const conf = this.service.getDefaultServiceConfiguration('products');
    this.service.configureService(conf);
    this.service.query({ "PRO_ID": id }, ["PRO_ID", "PRO_NAME", "PRO_DESCRIPTION", "PRO_PRICE", "PRO_IMAGE", "PRO_SALE", "BRA_NAME", "PGE_NAME", "CAT_NAME"], "productEnabled")
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


  addProduct(product: any) {
    this.cartService.addProductToCart(product);
  }

}
