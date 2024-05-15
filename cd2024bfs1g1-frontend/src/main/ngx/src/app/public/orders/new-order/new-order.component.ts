import { OnInit, Component, ViewChild, Injector, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { OFormComponent, OIntegerInputComponent, OntimizeService } from 'ontimize-web-ngx';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  @Input() item: any;
  cart: any[] = [];
  productId: number;
  insertedData: any;
  service: OntimizeService;
  product: any = {};
  products_cart: any[] = [];

  @ViewChild("pro_id") pro_id: OIntegerInputComponent;
  @ViewChild("formOrder") formOrder: OFormComponent;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    protected injector: Injector,
    protected sanitizer: DomSanitizer
  ) {
    this.service = this.injector.get(OntimizeService)
    this.cart = this.cartService.getCart();
  }



  ngOnInit() {
    const conf = this.service.getDefaultServiceConfiguration('products');
    this.service.configureService(conf);
    this.service.query({}, ["PRO_ID", "PRO_NAME", "PRO_PRICE", "PRO_IMAGE", "PRO_SALE"], "productEnabled")
      .subscribe((data) => {
        if (data.data.length > 0) {
          for(let i =0; i<data.data.length; i++){
            const product = data.data[i];
            const foundInCart = this.cartService.getCart().find(x => x.id === product.PRO_ID);
            if (foundInCart) {
              product.units = foundInCart.units;
              this.products_cart.push(product);
            }    
          }
        }
      })
  }

  public getImageSrc(base64: any): any {
    return base64 ? this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + base64) : './assets/images/no-image.png';
  }


  public totalAmount(): any {
    let totalAmount = 0;
    for(let z=0; z<this.products_cart.length; z++){
      totalAmount += this.products_cart[z].PRO_PRICE * this.products_cart[z].units
    }
    return totalAmount;
  }


  submitOrderLines(): void {

    const formOrderLines = document.getElementById('orderLine-Form') as HTMLFormElement
    const formData = new FormData(formOrderLines);
    const formOrder = formOrderLines.form;
    formData.forEach((value, key) => {
      formOrder.controls[key].setValue(value);
    });

    formOrderLines.submit();


  }

  submitOrder(): void {

    this.submitOrderLines();

    this.formOrder.onInsert.subscribe(
      (data) => {

        this.router.navigate(['/order/details', data['ORD_ID']]);

      },
      (error) => {

        console.error(error);

      });

    this.formOrder.insert();

  }

}
