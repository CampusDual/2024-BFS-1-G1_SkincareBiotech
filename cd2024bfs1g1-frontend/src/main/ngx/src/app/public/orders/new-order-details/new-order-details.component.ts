import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, OFormComponent, OIntegerInputComponent, OntimizeService } from 'ontimize-web-ngx';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-new-order-details',
  templateUrl: './new-order-details.component.html',
  styleUrls: ['./new-order-details.component.css']
})
export class NewOrderDetailsComponent implements OnInit, AfterViewInit {

  orderId: number;
  order: any;
  orderLines: any[] = [];
  @ViewChild('ord_id') ord_id: OIntegerInputComponent;
  @ViewChild("formOrder") formOrder: OFormComponent;

  constructor(
    private route: ActivatedRoute,
    private service: OntimizeService,
    protected sanitizer: DomSanitizer,
    protected router: Router,
  ) {
    this.orderId = parseInt(this.route.snapshot.paramMap.get('ORD_ID'));
    const qParamObs: Observable<any> = this.route.queryParams;
    qParamObs.subscribe(params => {
      if (params['Ds_MerchantParameters']) {
        const paramsDecode = CryptoJS.enc.Base64.parse(params['Ds_MerchantParameters']);
        const paramsDecodeText = CryptoJS.enc.Utf8.stringify(paramsDecode);
        const paramsJSON = JSON.parse(paramsDecodeText);
        if (paramsJSON.Ds_SecurePayment === '1' && (this.orderId === Number(paramsJSON.Ds_Order))) {
          this.payOrder(Number(paramsJSON.Ds_Order));
        }
      }
    });

  }
  ngAfterViewInit(): void {
    this.loadOrderDetails();
    this.loadOrderLines();
  }

  ngOnInit(): void {

  }

  private configureService(serviceName: string): void {

    const conf = this.service.getDefaultServiceConfiguration(serviceName);
    this.service.configureService(conf);

  }
  payOrder(id: number) {
    this.configureService('orders');
    this.service.update({ "ORD_ID": id }, { "ORD_PAID": true }, "order")
      .subscribe((data) => {
        console.log('Pago realizado');
      });
  }

  loadOrderLines(): void {
    this.configureService('orders');
    this.service.query({ "ORD_ID": this.orderId }, ["ORD_ID", "PRO_NAME", "PRO_IMAGE", "OL_PRICE", "OL_UNITS"], "orderLinesView")
      .subscribe((orderLinesViewData) => {

        this.orderLines = orderLinesViewData.data;
        console.log(this.orderLines);

      })

  }

  loadOrderDetails(): void {
    this.configureService('orders');
    this.service.query({ "ORD_ID": this.orderId }, ["ORD_ID", "ORD_NAME", "ORD_PHONE", "ORD_ZIPCODE", "ORD_ADDRESS", "ORD_DATE"], "orderByUser")
      .subscribe((orderData) => {
        this.order = orderData.data[0];
      });

  }

  timestampToDate(order) {
    let date = new Date(order);
    return date.toLocaleString();
  }

  public getImageSrc(base64: any): any {
    return base64 ? this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + base64) : './assets/images/no-image.png';
  }

  get price() {
    return this.order.PRO_PRICE?.toFixed(2);
  }

  goBack(): void {
    this.router.navigate(["/"]);
  }

}
