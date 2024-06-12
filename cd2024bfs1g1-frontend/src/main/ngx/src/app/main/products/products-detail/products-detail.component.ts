import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OCurrencyInputComponent, OFormComponent, OSlideToggleComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})
export class ProductsDetailComponent  {

  @ViewChild("proSaleToggle")
  proSaleToggle: OSlideToggleComponent;

  @ViewChild("proSaleCurrency")
  proSaleCurrency: OCurrencyInputComponent;

  @ViewChild('form') form: OFormComponent;


  isVisible: boolean = false;
  Visible:boolean = true;
  productName: string = '';

  constructor(
    protected injector: Injector,
    private router: Router,
  ) {
  }
  
  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
    this.Visible = !this.Visible;
  }
 

  onSelectedTabChange(){
    this.router.navigate(['/main/products/:PRO_ID/allergen']);
  }

  checkName($event: any){
    this.productName = $event.PRO_NAME;
  }
}
