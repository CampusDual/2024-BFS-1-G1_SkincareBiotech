import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OCurrencyInputComponent, OSlideToggleComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-products-new',
  templateUrl: './products-new.component.html',
  styleUrls: ['./products-new.component.css']
})
export class ProductsNewComponent {

  @ViewChild ("proSaleToggle")
  proSaleToggle : OSlideToggleComponent;

  @ViewChild ("proSaleCurrency")
  proSaleCurrency : OCurrencyInputComponent;

  constructor(
    private router: Router
  ) { }

  onInsert(success: boolean) {
    if (success) {
      this.router.navigate(['/main/products']);
    }
  }

  onChange(event){
    if(!this.proSaleToggle.isChecked()){
      this.proSaleCurrency.readOnly = true;
      this.proSaleCurrency.setValue(null);
    }else{
      this.proSaleCurrency.readOnly = false;
      this.proSaleCurrency.setEnabled(this.proSaleToggle.getValue());
    }
  }

}
