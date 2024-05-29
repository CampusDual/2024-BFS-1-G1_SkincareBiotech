import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-lines-detail',
  templateUrl: './orders-lines-detail.component.html',
  styleUrls: ['./orders-lines-detail.component.scss']
})
export class OrdersLinesDetailComponent implements OnInit {

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

}
