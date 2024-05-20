import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OFormComponent, OIntegerInputComponent, OTranslateService } from 'ontimize-web-ngx';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements AfterViewInit {

  currLang: string;
  productId: number;
  insertedData: any;
  price: string;
  order: string;


  @ViewChild("pro_id") pro_id: OIntegerInputComponent;
  @ViewChild("formOrder") formOrder: OFormComponent;
  @ViewChild("Ds_MerchantParameters") ds_merchantParameters: ElementRef;
  @ViewChild("Ds_Signature") ds_signature: ElementRef;
  @ViewChild("language") language: OIntegerInputComponent;

  constructor(
    private route: ActivatedRoute,
    private translateService: OTranslateService,
  ) {
    console.log(this.translateService.get("REDSYS_LANGUAGE_CODE"));
    console.log(this.translateService.getCurrentLang())
  }

  ngAfterViewInit(): void {

    this.route.params.subscribe(params => {
      this.productId = Number(params['PRO_ID']);
      this.pro_id.setValue(this.productId);
      console.log(this.pro_id.getValue());
    });


  }

  submitOrder(): void {

    this.formOrder.insert();

  }

  submitOrderRedsys(): void {

    this.formOrder.onInsert.subscribe(
      (data) => {

        this.order = (data[0].ORD_ID).toString().padStart(12, "0");
        this.price = (data[0].ORD_PRICE * 100).toString();

        this.submitRedsysOrder();
      },
      (error) => {
        console.error(error);
      }
    );
    this.formOrder.insert();
  }

  currentLang(): void {

    const lang = this.translateService.getCurrentLang();

    if (lang == "en") {

      this.currLang = "2";

    } else  {

      this.currLang = "1";

    }


  }

  submitRedsysOrder(): void {


    this.currentLang();
    // Datos de la transacción
    const datosTransaccion = {
      "DS_MERCHANT_AMOUNT": this.price,//this.price, // Los dos últimos son decimales (5000 = 50,00)
      "DS_MERCHANT_CURRENCY": "978",
      "DS_MERCHANT_MERCHANTCODE": "999008881",
      "DS_MERCHANT_MERCHANTURL": "http://localhost:4299",
      "DS_MERCHANT_ORDER": this.order,//this.order, // No se puede repetir(= id pedido)
      "DS_MERCHANT_TERMINAL": "1",
      "DS_MERCHANT_TRANSACTIONTYPE": "0",
      "DS_MERCHANT_URLKO": `http://localhost:4299/order/rejected/${this.order}`,
      "DS_MERCHANT_URLOK": `http://localhost:4299/order/accepted/${this.order}`,
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