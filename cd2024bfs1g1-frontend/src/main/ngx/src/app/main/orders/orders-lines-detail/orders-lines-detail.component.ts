import { Component, OnInit, ViewChild } from '@angular/core';
import { OComboComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-orders-lines-detail',
  templateUrl: './orders-lines-detail.component.html',
  styleUrls: ['./orders-lines-detail.component.css']
})
export class OrdersLinesDetailComponent implements OnInit {
  @ViewChild ("sent") sent:OComboComponent;
  orderPaid: boolean;

  public optionSent = [{
    valueSent: true,
    textSent: "SENT"
  },
  {
    valueSent: false,
    textSent: "UNSENT"
  }];
  
  constructor() { }

  ngOnInit() {
  }
  onDataLoaded(event: any) {
    this.sent.enabled = event.ORD_PAID;
    this.orderPaid = event.ORD_PAID;
    }
}
