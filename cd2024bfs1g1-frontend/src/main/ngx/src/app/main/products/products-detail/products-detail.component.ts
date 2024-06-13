import { Component, Injector, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OCurrencyInputComponent, OFormComponent, OSlideToggleComponent } from 'ontimize-web-ngx';
import { LanguageService } from 'src/app/shared/services/language.service';
import { Subscription } from 'rxjs';
import { OTranslateService } from 'ontimize-web-ngx';


@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})
export class ProductsDetailComponent implements OnInit, OnDestroy {

  @ViewChild("proSaleToggle")
  proSaleToggle: OSlideToggleComponent;

  @ViewChild("proSaleCurrency")
  proSaleCurrency: OCurrencyInputComponent;

  @ViewChild('form')
  form: OFormComponent;

  isVisible: boolean = false;
  Visible: boolean = true;
  productName: string = '';
  productId: number;

  isGraph: boolean = true;
  maxClick: number = 0;
  totalClicks: number = 0;
  percentaje: number;
  maxDate: number;
  maxDay: number;
  maxMonth: string;
  percentage: number;

  private translateSubscription: Subscription;

  constructor(
    protected injector: Injector,
    private router: Router,
    protected languageService: LanguageService,
    protected translateService: OTranslateService
  ) {
    this.languageService.getLanguage();
  }

  ngOnInit(): void {
    this.translateSubscription = this.translateService.onLanguageChanged.subscribe(() => {
      this.formatDate(this.maxDate);
    });
  }

  ngOnDestroy(): void {
    if (this.translateSubscription) {
      this.translateSubscription.unsubscribe();
    }
  }

  loadClicks(event: any) {
    event.forEach(item => {
      console.log(item)
      this.totalClicks += item.VISITS
      if (item.VISITS > this.maxClick) {
        this.maxClick = item.VISITS;
        this.maxDate = item.VISIT_DATE;
      }
    })

    this.isGraph = this.maxClick > 0;

    this.formatDate(this.maxDate);
    this.percentage = (this.maxClick / this.totalClicks) * 100;
    console.log(this.isGraph)
  }

  private formatDate(date: number) {
    if (!date) {
      this.maxMonth = '';
      return;
    }

    const newDate = new Date(date);
    this.maxDay = newDate.getDate();
    const idiomCode = this.translateService.getCurrentLang();
    const monthFormatter = new Intl.DateTimeFormat(idiomCode, { month: 'long' });

    this.maxMonth = monthFormatter.format(newDate);
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
    this.Visible = !this.Visible;
  }


  onSelectedTabChange() {
    this.router.navigate(['/main/products/:PRO_ID/allergen']);
  }

  checkName($event: any) {
    this.productName = $event.PRO_NAME;
  }
}
