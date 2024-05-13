import { Component, OnInit, Input, Injector, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OntimizeService } from 'ontimize-web-ngx';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() item: any;
  @Input() idItem: any;
  @Output() updateCart = new EventEmitter<void>();
  service: OntimizeService;
  product: any={};  


  constructor(
    protected injector: Injector,
    protected sanitizer: DomSanitizer,
    private cartService: CartService
  ) {
    this.service = this.injector.get(OntimizeService)
  }

  ngOnInit() {
    const conf = this.service.getDefaultServiceConfiguration('products');
    this.service.configureService(conf);
    this.service.query({ "PRO_ID": this.item.id }, ["PRO_ID", "PRO_NAME", "PRO_DESCRIPTION", "PRO_PRICE", "PRO_IMAGE", "PRO_SALE"], "productEnabled")
      .subscribe((data) => {
        if (data.data.length > 0) {
          this.product = data.data[0];
          this.itemAmount(this.product)
        }
      })
  }

  public getImageSrc(base64: any): any {
    return base64 ? this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + base64) : './assets/images/no-image.png';
  }

  public itemAmount(product: any): any {
    return product.PRO_PRICE * this.item.units;
  }


  public addItem() {
    this.cartService.addProductToCart(this.product);
    this.item.units = this.cartService.getCart().find(x=>x.id == this.item.id).units;
    this.updateCart.emit();
  }

  public removeItem() {
    this.cartService.removeItem(this.product.PRO_ID);
    let p_ls =this.cartService.getCart().find(x=>x.id == this.item.id);
    if(p_ls !== undefined){
      this.item.units = p_ls.units;
    }
    this.updateCart.emit();
  }
}
