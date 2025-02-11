import { Component, Inject, Injector, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OCurrencyInputComponent, OFormComponent, OSlideToggleComponent, OntimizeService } from 'ontimize-web-ngx';
import { DiscreteBarChartConfiguration, OChartComponent, PieChartConfiguration } from 'ontimize-web-ngx-charts';
import { Subscription } from 'rxjs';
import { OTranslateService } from 'ontimize-web-ngx';
import { LanguageService } from 'src/app/shared/services/language.service';


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
  service2: OntimizeService;

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

  public pieParameters: PieChartConfiguration;
  public colorScheme = {
    domain: ['#24b14a ', '#DCD516', '#e81d23']
  };

  chartParameters: DiscreteBarChartConfiguration;
  
  constructor(
    protected injector: Injector,
    private router: Router,
    private route: ActivatedRoute,
    protected languageService: LanguageService,
    protected translateService: OTranslateService
  ) {

    this.chartParameters = new DiscreteBarChartConfiguration();
    this.chartParameters.showYAxis = true;
    this.chartParameters.showXAxis = true;
    this.chartParameters.showLegend = true;
    this.chartParameters.showValues = false;
    this.chartParameters.margin.left = 50;

    this.pieParameters = new PieChartConfiguration();
    this.pieParameters.labelsOutside = false;
    this.pieParameters.legendPosition = 'right';
    this.pieParameters.showLabels = false;
    this.pieParameters.labelsOutside = false;
    this.pieParameters.labelType = 'percent';

    this.service = this.injector.get(OntimizeService);
    this.service2 = this.injector.get(OntimizeService);
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
    this.Visible = !this.Visible;
  }

  ngOnInit(): void {

    this.translateSubscription = this.translateService.onLanguageChanged.subscribe(() => {
      this.formatDate(this.maxDate);
      this.updateChartLabels();
      this.fetchCustomerData();
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
      });

    
  }

  ngOnDestroy(): void {
    if (this.translateSubscription) {
      this.translateSubscription.unsubscribe();
    }
  }

  loadClicks(event: any) {
    let clicks=0;
    event.forEach(item => {
      clicks += item.VISITS;
      if (item.VISITS > this.maxClick) {
        this.maxClick = item.VISITS;
        this.maxDate = item.VISIT_DATE;
      }
    })
    this.totalClicks = clicks;
    this.isGraph = this.maxClick > 0;

    this.formatDate(this.maxDate);
    this.percentage = (this.maxClick / this.totalClicks) * 100;
  }

  private formatDate(maxDate: number) {
    if (!maxDate) {
      this.maxMonth = '';
      return;
    }

    const newDate = new Date(maxDate);
    this.maxDay = newDate.getDate();
    const idiomCode = this.translateService.getCurrentLang();
    const monthFormatter = new Intl.DateTimeFormat(idiomCode, { month: 'long' });

    this.maxMonth = monthFormatter.format(newDate);
  }

  fetchCustomerData(): void {
    let productId = parseInt(this.route.snapshot.paramMap.get('PRO_ID'));
    const conf = this.service2.getDefaultServiceConfiguration('allergen-products');
    this.service2.configureService(conf);
    this.service2.query(
      { 'PRO_ID': productId },
      ["PRO_ID", "objetivo_count", "no_recomendado_count", "alergia_count"],
      "getProductRecommendations"
    ).subscribe((data) => {
      if (data.data.length > 0) {
        this.loadChart(data.data);
      }
    });
  }

  loadChart(data: any): void {
    const event = data[0];
    const total = event.objetivo_count + event.no_recomendado_count + event.alergia_count;
    const groupedData = [
      { name: 'OBJECTIVE', value: Math.round((event.objetivo_count / total) * 100) },
      { name: 'NOT_RECOMMENDED', value: Math.round((event.no_recomendado_count / total) * 100) },
      { name: 'ALLERGY', value: Math.round((event.alergia_count / total) * 100) }
    ];
    this.data = groupedData;
    this.updateChartLabels();
  }

  updateChartLabels(): void {
    if (!this.data) return;

    this.data = this.data.map(item => ({
      ...item,
      name: this.translateService.get(item.name)
    }));
  }

  onUpdate(success: boolean): void {
    if (success) {
      this.router.navigate(['/main/products']);
    }
  }

  changePrice(event): void {
    if (!event) {
      this.priceUser = 0;
    } else {
      this.priceUser = (event / (1 - (this.commissionPlatform / 100))) / (1 - (this.commissionRedSys / 100));
    }
  }

  checkName($event: any): void { 
    this.product = $event;
    this.priceSaleUser = $event.PRO_SALE;
    this.productName = $event.PRO_NAME;
    this.fetchCustomerData();
  }

  finalPriceSale(rowData: Array<any>): number {
    return (rowData['SAL_PRICE'] / (1 - (this.commissionPlatform / 100))) / (1 - (this.commissionRedSys / 100));
  }

  getPriceCalculator() {
    let self = this;
    return (row) => {
      return self.finalPriceSale(row);
    }
  }
}