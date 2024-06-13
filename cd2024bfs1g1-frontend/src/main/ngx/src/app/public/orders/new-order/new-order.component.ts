import { AfterViewInit, Component, ViewChild, ElementRef, OnInit, Injector, Input, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OFormComponent, OIntegerInputComponent, OTranslateService, OntimizeService, OTextInputComponent, Expression, FilterExpression, FilterExpressionUtils, AuthService, OCheckboxComponent, DialogService, OTranslatePipe } from 'ontimize-web-ngx';
import * as CryptoJS from 'crypto-js';
import { DomSanitizer } from '@angular/platform-browser';
import { CartService } from 'src/app/shared/services/cart.service';
import Swal from 'sweetalert2';
import { ValidatorFn, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements AfterViewInit, OnInit {

  currLang: string;
  productId: number;
  price: string;
  order: string;
  orderView: string;
  url: string;

  @Input() item: any;
  @Input() showBtns: boolean = true;
  cart: any[] = [];
  products_cart: any[] = []
  insertedData: any;
  service: OntimizeService;
  filterExp: {};
  PRO_ID = "PRO_ID";
  totalAmount: number = 0;
  totalAmount: number = 0;
  products = [];

  @ViewChild("formOrder") formOrder: OFormComponent;
  @ViewChild("Ds_MerchantParameters") ds_merchantParameters: ElementRef;
  @ViewChild("Ds_Signature") ds_signature: ElementRef;
  @ViewChild("language") language: OIntegerInputComponent;
  @ViewChild("nameInput") nameInput: OTextInputComponent;
  @ViewChild("phoneInput") phoneInput: OIntegerInputComponent;
  @ViewChild("zipInput") zipInput: OIntegerInputComponent;
  @ViewChild("addressInput") addressInput: OTextInputComponent;
  @ViewChild("usrId") usrId: OIntegerInputComponent;
  @ViewChild("defAddress") defAddress: MatCheckbox;



  validatorZip: ValidatorFn[] = [];
  validatorPhone: ValidatorFn[] = [];
  validatorsNameArray: ValidatorFn[] = [];


  constructor(
    @Inject(AuthService) private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    protected injector: Injector,
    protected sanitizer: DomSanitizer,
    private translateService: OTranslateService,
    protected translate: OTranslateService,
    protected dialogService: DialogService

  ) {
    this.service = this.injector.get(OntimizeService);
    this.cart = this.cartService.getCart();
    this.translate = this.injector.get(OTranslateService);
    this.validatorZip.push(Validators.minLength(5));
    this.validatorZip.push(Validators.maxLength(5));
    this.validatorZip.push(Validators.pattern('^[0-9]*$')); 
    this.validatorPhone.push(Validators.minLength(9));
    this.validatorPhone.push(Validators.maxLength(9));
    this.validatorPhone.push(Validators.pattern('^[6-9][0-9]*$'));
    this.validatorsNameArray.push(Validators.pattern('^[a-zA-Z_ ]*$'));

  }

  private configureService(serviceName: string): void {

    const conf = this.service.getDefaultServiceConfiguration(serviceName);
    this.service.configureService(conf);

  }

  ngOnInit() {
    this.configureService('products');
    const cartProductsId = this.cart.map(item => item.id);
    this.filterExp = { "@basic_expression": this.filter(cartProductsId) };
    this.service.query(this.filterExp, ["PRO_ID", "PRICE", "PRO_SALE", "REAL_PRICE"], "product").subscribe((data) => {
      this.products = data.data;
      this.updateTotalAmount();
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
  ngAfterViewInit(): void {
    this.formOrder.queryData({ "USR_ID": 0 });

  }

  onFormDataLoaded(event) {
    //console.log(event)
    let data = {
      UPR_ADDRESS: this.addressInput.getValue(),
      USR_PHONE: this.phoneInput.getValue(),
      USR_ZIP: this.zipInput.getValue(),
      USR_ID: this.usrId.getValue(),
      UPR_RECIPIENT: this.nameInput.getValue(),

    }
    console.log(data);
    if (data.UPR_ADDRESS === "" || data.USR_ZIP === "") {
      this.defAddress.checked = true;
    } else {
      this.defAddress.checked = false;
    }

    

  }

  updateProfile(data: any) {
    this.configureService('profiles');
    this.service.update({ "USR_ID": data.USR_ID }, { "UPR_ADDRESS": data.UPR_ADDRESS, "UPR_ZIPCODE": data.USR_ZIP, "USR_PHONE": data.USR_PHONE, "UPR_RECIPIENT": data.UPR_RECIPIENT }, "userProfile")
      .subscribe((data) => {
        console.log('Profile updated');
      });
  }

  updateTotalAmount() {
    let totalAmount = 0;
    this.updateCard();
    this.products.forEach(product => {
      const cartItem = this.cart.find(item => item.id === product.PRO_ID);
      if (cartItem) {
        const units = cartItem.units;
        const price = product.REAL_PRICE;
        totalAmount += price * units;
      }
    });
    this.totalAmount = totalAmount;
  }
  updateCard() {
    this.cart = this.cartService.getCart();
  }
  submitOrder(): void {

    if (this.authService.isLoggedIn()) {

      const conf = this.service.getDefaultServiceConfiguration('orders');
      this.service.configureService(conf);
      let data = {
        ORD_NAME: this.nameInput.getValue(),
        ORD_PHONE: this.phoneInput.getValue(),
        ORD_ZIPCODE: this.zipInput.getValue(),
        ORD_ADDRESS: this.addressInput.getValue(),
        ORD_ITEMS: this.cartService.getCart()
      }
      if (data.ORD_NAME != null && data.ORD_PHONE != null && data.ORD_ZIPCODE != null && data.ORD_ADDRESS != null) {
        this.cartService.emptyCart();
        this.service.insert(data, "order").subscribe(res => {
          this.order = (res.data["ORD_ID"]).toString().padStart(12, "0");
          this.orderView = (res.data["ORD_ID"]).toString();
          this.price = (this.totalAmount * 100).toFixed(0);
          this.submitRedsysOrder();
        })
      } else {
        Swal.fire({
          title: this.translate.get('ERROR_COMPLETE_FORM'),
          icon: 'error',
          confirmButtonText: 'OK'
        });

      }

    } else {
      this.router.navigate(['/login'],
        { queryParams: { 'session-not-started': 'true' } }
      )  // En el futuro si se cambia esta clase mantener la redireccion de este caso de uso
    }

  }
  currentLang(): void {

    const lang = this.translateService.getCurrentLang();

    if (lang == "en") {

      this.currLang = "2";

    } else {

      this.currLang = "1";

    }
  }
  goBack(): void {
    this.router.navigate(["/"]);
  }
  submitRedsysOrder(): void {
    let data = {
      UPR_ADDRESS: this.addressInput.getValue(),
      USR_PHONE: this.phoneInput.getValue(),
      USR_ZIP: this.zipInput.getValue(),
      USR_ID: this.usrId.getValue(),
      UPR_RECIPIENT: this.nameInput.getValue(),


    }
    console.log(data.USR_PHONE.length)
    if(data.USR_ZIP.length!=5 || data.USR_PHONE.length!=9 || !/^[6789]\d{8}$/.test(data.USR_PHONE) 
      || data.UPR_ADDRESS.length<1  || data.UPR_RECIPIENT.length<1 || !/^[a-zA-Z_ ]*$/.test(data.UPR_RECIPIENT) ){
      this.dialogService.alert('Error', this.translate.get(
        'DATA_FORM_INVALID'
        ));
    }else{

      if (this.defAddress.checked==true){
        this.updateProfile(data)
      }

      this.url = document.querySelector("base").href;
      this.currentLang();
      // Datos de la transacción
      const datosTransaccion = {
        "DS_MERCHANT_AMOUNT": this.price,//this.price, // Los dos últimos son decimales (5000 = 50,00)
        "DS_MERCHANT_CURRENCY": "978",
        "DS_MERCHANT_MERCHANTCODE": "999008881",
        "DS_MERCHANT_MERCHANTURL": this.url,
        "DS_MERCHANT_ORDER": this.order,//this.order, // No se puede repetir(= id pedido)
        "DS_MERCHANT_TERMINAL": "1",
        "DS_MERCHANT_TRANSACTIONTYPE": "0",
        "DS_MERCHANT_URLKO": `${this.url}/order/rejected/${this.order}`,
        "DS_MERCHANT_URLOK": `${this.url}/profile/${this.orderView}`,
        "DS_MERCHANT_CONSUMERLANGUAGE": this.currLang // 1: Español - 2:Inglés
      }

      // 1 - Decodificar la clave del comercio en BASE64
      const claveComercio = "sq7HjrUOBfKmC576ILgskD5srU870gJ7";
      const claveComercioWordArray = CryptoJS.enc.Base64.parse(claveComercio);

      // 2 - Diversificar la clave de firma realizando un cifrado 3DES

      // Se define el vector de inicialización (IV)
      const iv = CryptoJS.enc.Hex.parse("0000000000000000");

      // Se realiza el cifrado 3DES del número de pedido de la transacción
      const cifrado = CryptoJS.TripleDES.encrypt(datosTransaccion.DS_MERCHANT_ORDER, claveComercioWordArray, {
        iv: iv, // Se utiliza el vector de inicialización definido anteriormente
        mode: CryptoJS.mode.CBC, // Se utiliza el modo de operación Cipher Block Chaining (CBC)
        padding: CryptoJS.pad.ZeroPadding // No se aplica ningún tipo de relleno (padding)
      });

      // 3 - Codificar los datos de la transacción en Base64 (principio documento oficial)
      const datosTransaccionWordArray = CryptoJS.enc.Utf8.parse(JSON.stringify(datosTransaccion));
      const datosTransaccionBase64 = CryptoJS.enc.Base64.stringify(datosTransaccionWordArray);

      // 4 - Calcular el HMAC-256 con los datos de la transacción y la clave diversificada
      const firma = CryptoJS.HmacSHA256(datosTransaccionBase64, cifrado.ciphertext);

      // 5 - Codificar la firma en Base64
      const firmaBase64 = CryptoJS.enc.Base64.stringify(firma);

      // Establecer el valor de los campos en el formulario HTML

      this.ds_merchantParameters.nativeElement.value = datosTransaccionBase64;
      this.ds_signature.nativeElement.value = firmaBase64;
      //console.log(this.ds_merchantParameters.nativeElement.value);

      // Enviar el formulario después de establecer los valores
      const form = document.forms['form'];
      if (form) {
        form.submit();
      }
    }
  }
}
