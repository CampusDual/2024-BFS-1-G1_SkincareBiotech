import { Component, OnInit, Input, Injector, Output, EventEmitter, ViewChild, ElementRef, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogService, OTranslateService, OntimizeService } from 'ontimize-web-ngx';
import { CartService } from 'src/app/shared/services/cart.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  @Input() item: any;
  @Input() showBtns: boolean = true;
  @Output() updateCart = new EventEmitter<void>();
  service: OntimizeService;
  product: any = {};
  @ViewChild('less') less: ElementRef;
  isButtonDisabled: boolean;


  constructor(
    @Inject(DialogService) private dialogService: DialogService,
    protected injector: Injector,
    protected sanitizer: DomSanitizer,
    private cartService: CartService,
    protected translate: OTranslateService,

  ) {
    this.service = this.injector.get(OntimizeService)
    this.translate = this.injector.get(OTranslateService);
  }

  ngOnInit() {
    const conf = this.service.getDefaultServiceConfiguration('products');
    this.service.configureService(conf);
    this.service.query({ "PRO_ID": this.item.id }, ["PRO_ID", "PRO_NAME", "PRO_DESCRIPTION", "PRICE", "REAL_PRICE", "PRO_IMAGE", "PRO_SALE"], "productEnabled")
      .subscribe((data) => {
        if (data.data.length > 0) {
          this.product = data.data[0];
          this.itemAmount(this.product)
        }
      })
    if (this.item.units <= 1) {
      this.isButtonDisabled = true;
    }
  }
  public getImageSrc(base64: any): any {
    return base64 ? this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + base64) : './assets/images/no-image.png';
  }

  get price() {
    return this.product.PRICE?.toFixed(2);
  }
  get sale() {
    return this.product.PRO_SALE?.toFixed(2);
  }
  public itemAmount(product: any): any {
    return product.PRICE * this.item.units;
  }
  public addItem() {
    this.cartService.addProductToCart(this.product);
    this.item.units = this.cartService.getCart().find(x => x.id == this.item.id).units;
    this.updateCart.emit();
    if (this.item.units > 1) {
      (<HTMLButtonElement>this.less.nativeElement).disabled = false;
    }
  }
  public removeItem() {
    if (this.item.units > 1) {
      this.cartService.removeItem(this.product.PRO_ID);
      let p_ls = this.cartService.getCart().find(x => x.id == this.item.id);
      if (p_ls !== undefined) {
        this.item.units = p_ls.units;
      }
      this.updateCart.emit();
    }
    if (this.item.units <= 1) {
      (<HTMLButtonElement>this.less.nativeElement).disabled = true;
    }
  }

  public deleteItem() {
    this.dialogService.confirm(this.translate.get('TITLE_CART_WARNING'), this.translate.get('DELETE_CART_WARNING')).then((result) => {
      if (result) {
        this.cartService.deleteItem(this.product.PRO_ID);
        this.updateCart.emit();
      }
    });
  }
}
