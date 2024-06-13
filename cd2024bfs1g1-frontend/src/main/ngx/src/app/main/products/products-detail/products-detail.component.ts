import { Component, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OCurrencyInputComponent, OFormComponent, OSlideToggleComponent } from 'ontimize-web-ngx';
import { LanguageService } from 'src/app/shared/services/language.service';


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
    protected languageService: LanguageService
  ) {
    this.languageService.getLanguage();
  }

  loadClicks(event: any){
    console.log(this.isGraph)
    event.forEach(item =>{
      console.log(item)
      this.totalClicks += item.VISITS
      if(item.VISITS > this.maxClick){
        this.maxClick = item.VISITS;
        this.maxDate = item.VISIT_DATE;
      }
    })
    console.log(this.totalClicks)
    console.log(this.maxClick)
    if(this.maxClick<=0){
      this.isGraph = false;
    }
    this.formatDate(this.maxDate);
    this.percentage = (this.maxClick / this.totalClicks) * 100;
    console.log(this.isGraph)
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
