import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { OFormComponent, OIntegerInputComponent, OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-new-order-details',
  templateUrl: './new-order-details.component.html',
  styleUrls: ['./new-order-details.component.css']
})
export class NewOrderDetailsComponent implements OnInit, AfterViewInit {

  orderId: number;
  order: any;
  orderLines : any[] = [];
  @ViewChild('ord_id') ord_id: OIntegerInputComponent;
  @ViewChild("formOrder") formOrder: OFormComponent;

  constructor(
    private route: ActivatedRoute,
    private service: OntimizeService,
    protected sanitizer: DomSanitizer,
    protected router: Router,
  ) {

  }
  ngAfterViewInit(): void {

    this.route.params.subscribe(params => {
      this.orderId = Number(params['ORD_ID']);
      this.configureService('orders');
      this.loadOrderDetails();
      this.loadOrderLines();

    });

  }

  ngOnInit(): void {

  }

  private configureService(serviceName: string): void {

    const conf = this.service.getDefaultServiceConfiguration(serviceName);
    this.service.configureService(conf);

  }

  loadOrderLines(): void {
  this.service.query({ "ORD_ID": this.orderId }, ["ORD_ID", "PRO_NAME", "PRO_IMAGE", "OL_PRICE", "OL_UNITS"], "orderLinesView")
  .subscribe((orderLinesViewData) => {
    
    this.orderLines = orderLinesViewData.data;
    console.log(this.orderLines);
    
  })
  
  }

  loadOrderDetails(): void {

    this.service.query({ "ORD_ID": this.orderId }, ["ORD_ID", "ORD_NAME", "ORD_PHONE", "ORD_ZIPCODE", "ORD_ADDRESS", "ORD_SENT", "ORD_DATE"], "order")
      .subscribe((orderData) => {
        this.order = orderData.data[0];
      });

  }

  timestampToDate(order) {     
    let date = new Date(order);     
    return date.toLocaleString(); }

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
