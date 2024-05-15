import { OnInit, Component, ViewChild, Injector, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { OFormComponent, OIntegerInputComponent, OntimizeService, OTextInputComponent } from 'ontimize-web-ngx';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  @Input() item: any;
  @Input() showBtns: boolean = true;
  cart: any[] = [];
  products_cart: any[] = []
  insertedData: any;
  service: OntimizeService;

  @ViewChild("pro_id") pro_id: OIntegerInputComponent;
  @ViewChild("formOrder") formOrder: OFormComponent;
  @ViewChild("nameInput") nameInput: OTextInputComponent;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    protected injector: Injector,
    protected sanitizer: DomSanitizer,

  ) {
    this.service = this.injector.get(OntimizeService);
    this.cart = this.cartService.getCart();

  }

  ngOnInit() {
    const conf_prods = this.service.getDefaultServiceConfiguration('products');
    this.service.configureService(conf_prods);
    const cartProductsId = this.cart.map(item => item.id)
    for (let i = 0; i < cartProductsId.length; i++) {

      this.service.query({ "PRO_ID": cartProductsId[i] }, ["PRO_ID", "PRO_NAME", "PRO_PRICE", "PRO_IMAGE", "PRO_SALE"], "productEnabled")
        .subscribe((data) => {
          if (data.data.length > 0) {
            this.products_cart.push(data.data);
          }
        })
    }
  }

  public totalAmount(): any {
    let totalAmount = 0;
    for (let z = 0; z < this.products_cart.length; z++) {
      totalAmount += this.products_cart[z][0].PRO_PRICE * this.cart[z].units
    }
    return totalAmount;

  }



  submitOrder(): void {

    // this.formOrder.onInsert.subscribe(
    //   (data) => {

    //     this.router.navigate(['/order/details', data['ORD_ID']]);
    //     for (let i = 0; i < this.products_cart.length; i++) {
    //       const av = {
    //         ORD_ID: data['ORD_ID'],
    //         PRO_ID: this.products_cart[i][0].PRO_ID,
    //         OL_PRICE: this.products_cart[i][0].PRO_PRICE,
    //         OL_UNITS: this.cart[i].units
    //       };
    //       this.service.insert(av, 'orderlines')
    //       console.log(av)
    //     }
    //   },
    //   (error) => {

    //     console.error(error);

    //   });

    // this.formOrder.insert();

    const conf = this.service.getDefaultServiceConfiguration('orders');
    this.service.configureService(conf);
    let data = {
      ORD_NAME: this.nameInput.getValue(),
      ORD_ITEMS: this.cartService.getCart()
    };
    console.log(data)
    this.service.insert(data, "order")
      .subscribe(res => {
        console.log(res)
      })


  }

}
