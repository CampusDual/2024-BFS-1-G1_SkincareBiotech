import { Component, Inject, Injector, Input, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OCurrencyInputComponent, OFormComponent, OSlideToggleComponent, OntimizeService } from 'ontimize-web-ngx';
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

  @ViewChild('realPriceCurrency')
  realPriceCurrency: OCurrencyInputComponent;
  @ViewChild('form')
  form: OFormComponent;

 
  data: any;
  isVisible: boolean = false;
  Visible:  boolean = true;
  product: any = {};
  service: OntimizeService;

  public commissionPlatform: number;
  public commissionRedSys: number;
  public priceUser: number;
  
  productName: string = '';
  isDataLoaded: boolean = false;
  priceSaleUser: any = false;
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

    const conf = this.service.getDefaultServiceConfiguration('commissions');
    this.service.configureService(conf);
    this.service.query({}, ["COM_NAME", "COM_VALUE"], "commission")
      .subscribe((data) => {
        if (data.data.length > 0) {
          this.commissionRedSys = data.data.find((element) => (element.COM_NAME === "Redsys_commissions")).COM_VALUE;
          this.commissionPlatform = data.data.find((element) => (element.COM_NAME === "Platform_commissions")).COM_VALUE;
          this.isDataLoaded = true;
        }
      })

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


  onUpdate(success: boolean) {
    if (success) {
      this.router.navigate(['/main/products']);
    }
  }

  changePrice(event) {
    if (!event) {
      this.priceUser = 0;
    } else {
      this.priceUser = (event / (1 - (this.commissionPlatform / 100))) / (1 - (this.commissionRedSys / 100));
    }
  }

  checkName($event: any)  {
    this.product = $event;
    this.priceSaleUser = $event.PRO_SALE;
    this.productName = $event.PRO_NAME;
  }

  finalPriceSale(rowData: Array<any>): number {
    return (rowData['SAL_PRICE'] / (1 - (this.commissionPlatform / 100))) / (1 - (this.commissionRedSys / 100));
  }
  getPriceCalculator() {
    let self = this;
    return (row) => {
      return self.finalPriceSale(row)
    }
  }
}
