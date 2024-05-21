import { OnInit, Component, ViewChild, Injector, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Expression, FilterExpression, FilterExpressionUtils, OFormComponent, OIntegerInputComponent, OntimizeService, OTextInputComponent } from 'ontimize-web-ngx';
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
  filterExp: {};
  PRO_ID = "PRO_ID";
  totalAmount:number = 0;

  @ViewChild("formOrder") formOrder: OFormComponent;
  @ViewChild("nameInput") nameInput: OTextInputComponent;
  @ViewChild("phoneInput") phoneInput: OIntegerInputComponent;
  @ViewChild("zipInput") zipInput: OIntegerInputComponent;
  @ViewChild("addressInput") addressInput: OTextInputComponent;
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
    const cartProductsId = this.cart.map(item => item.id);
    this.filterExp = {"@basic_expression":this.filter(cartProductsId)};
    this.service.query(this.filterExp, ["PRO_ID", "PRO_PRICE", "PRO_SALE"], "product").subscribe((data) => {
      data.data.forEach(product => {
        if (product.PRO_SALE) {
          let units = (this.cart.find(item => item.id === product.PRO_ID)).units;
          this.totalAmount += product.PRO_SALE * units;
        } else {
          let units = (this.cart.find(item => item.id === product.PRO_ID)).units;
          this.totalAmount += product.PRO_PRICE * units;

        }
      });
    });
  }

  filter(cartProductsId) {
    let filter: Array<Expression> = [];
    cartProductsId.forEach(id => {
      filter.push(FilterExpressionUtils.buildExpressionEquals(this.PRO_ID, id));
    })
    if (filter.length !== 0) {
      return filter.reduce((exp1, exp2) => FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_OR));
    }
  }



  submitOrder(): void {

    const conf = this.service.getDefaultServiceConfiguration('orders');
    this.service.configureService(conf);
    let data = {
      ORD_NAME: this.nameInput.getValue(),
      ORD_PHONE: this.phoneInput.getValue(),
      ORD_ZIPCODE: this.zipInput.getValue(),
      ORD_ADDRESS: this.addressInput.getValue(),
      ORD_ITEMS: this.cartService.getCart()
    };
    console.log(data)
    this.cartService.emptyCart();

    this.service.insert(data, "order")
      .subscribe(res => {

        console.log(res.data);
        this.router.navigate(['/order/details', res.data['ORD_ID']]);
      })
  }

  goBack(): void {
    this.router.navigate(["/cart/view"]);
  }
}
