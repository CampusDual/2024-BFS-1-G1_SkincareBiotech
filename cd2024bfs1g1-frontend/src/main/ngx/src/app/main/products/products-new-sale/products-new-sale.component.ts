import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { OCurrencyInputComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-products-new-sale',
  templateUrl: './products-new-sale.component.html',
  styleUrls: ['./products-new-sale.component.css']
})
export class ProductsNewSaleComponent implements OnInit {
  @ViewChild ("originalPrice") originalPrice:OCurrencyInputComponent;
  proPrice: any;

  constructor() {}

  ngOnInit() {
  }



  onKeyUp(event: KeyboardEvent) {
    this.proPrice = this.originalPrice.getValue();
    console.log(this.proPrice);
  }

}
