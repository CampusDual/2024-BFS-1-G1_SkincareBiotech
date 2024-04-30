import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OFormComponent, OIntegerInputComponent, OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-new-order-details',
  templateUrl: './new-order-details.component.html',
  styleUrls: ['./new-order-details.component.css']
})
export class NewOrderDetailsComponent implements OnInit, AfterViewInit {

  orderId: number;
  order: any;
  @ViewChild('ord_id') ord_id: OIntegerInputComponent;
  @ViewChild("pro_id") pro_id: OIntegerInputComponent;
  @ViewChild("formOrder") formOrder: OFormComponent;

  constructor(
    private route: ActivatedRoute,
    private service: OntimizeService,
  ) {

  }
  ngAfterViewInit(): void {

    this.route.params.subscribe(params => {
      this.orderId = Number(params['ORD_ID']);
      this.configureService('orders');
      this.loadOrderDetails();

    });

  }

  ngOnInit(): void {

  }

  private configureService(serviceName: string): void {

    const conf = this.service.getDefaultServiceConfiguration(serviceName);
    this.service.configureService(conf);

  }

  loadOrderDetails(): void {

    this.service.query({ "ORD_ID": this.orderId }, ["ORD_ID", "ORD_NAME", "ORD_PHONE", "ORD_ZIPCODE", "ORD_ADDRESS", "PRO_NAME", "PRO_DESCRIPTION", "PRO_PRICE", "PRO_IMAGE"], "order")
      .subscribe((orderData) => {
        this.order = orderData.data[0];
      });

  }
}
