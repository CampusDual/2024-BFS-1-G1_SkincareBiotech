import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OCurrencyInputComponent, OSlideToggleComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})
export class ProductsDetailComponent {

  @ViewChild ("proSaleToggle")
  proSaleToggle : OSlideToggleComponent;

  @ViewChild ("proSaleCurrency")
  proSaleCurrency : OCurrencyInputComponent;

  constructor(
    private router: Router
  ) { }

  onUpdate(success: boolean) {
    if (success) {
      this.router.navigate(['/main/products']);
    } 
  }

  onDataLoaded(event){
    this.proSaleToggle.setValue((event.PRO_SALE !== undefined));
    this.proSaleCurrency.setEnabled((event.PRO_SALE !== undefined));
  }

  onChange(event){
    if(!this.proSaleToggle.getValue()){
      this.proSaleCurrency.setValue(null);
    }
    this.proSaleCurrency.setEnabled(this.proSaleToggle.getValue());
  }

}
