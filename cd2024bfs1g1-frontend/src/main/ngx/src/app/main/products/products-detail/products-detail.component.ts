import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OCurrencyInputComponent, OFormComponent, OSlideToggleComponent } from 'ontimize-web-ngx';
import { OChartComponent } from 'ontimize-web-ngx-charts';

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

  @ViewChild('form') 
  form: OFormComponent;

  isVisible: boolean = false;
  Visible:boolean = true;
  productName: string = '';
  productId: number;

  isGraph: boolean = true;
  maxClick: number = 0;
  totalClicks: number =0;
  percentaje: number;
  maxDate: number;
  maxDay: number;
  maxMonth: string;
  percentage: number;

  constructor(
    protected injector: Injector,
    private router: Router,
  ) {
  }

  loadClicks(event: any){
    
    event.forEach(item =>{
      this.totalClicks += item.VISITS
      if(item.VISITS > this.maxClick){
        this.maxClick = item.VISITS;
        this.maxDate = item.VISIT_DATE;
      }
    })

    if(this.maxClick<=0){
      this.isGraph = false;
    }
    this.formatDate(this.maxDate);
    this.percentage = (this.maxClick / this.totalClicks) * 100;
  }

  private formatDate(date: number){
    const newDate = new Date(date);
    this.maxDay = newDate.getDate();
    const monthFormatter = new Intl.DateTimeFormat('es-ES', { month: 'long' });
    this.maxMonth = monthFormatter.format(newDate);
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
