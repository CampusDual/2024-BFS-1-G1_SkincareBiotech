import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { OTranslateService } from 'ontimize-web-ngx';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-data-analysis-home',
  templateUrl: './data-analysis-home.component.html',
  styleUrls: ['./data-analysis-home.component.css']
})
export class DataAnalysisHomeComponent implements OnInit, OnDestroy {

  maxDate: number;
  maxDay: number;
  maxMonth: string;
  totalBilled: number = 0;
  isGraph: boolean = true;
  maxAmount: number = 0;
  percentage: number;

  private translateSubscription: Subscription;

  constructor(
    protected injector: Injector,
    protected languageService: LanguageService,
    protected translateService: OTranslateService
  ) {}

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

  loadDataAnalysis(event: any) {
    this.totalBilled = 0;
    this.maxAmount = 0;

    event.forEach(item => {
      this.totalBilled += item.AMOUNT_PRICE;
      if (item.AMOUNT_PRICE > this.maxAmount) {
        this.maxAmount = item.AMOUNT_PRICE;
        this.maxDate = item.ORD_DATE;
      }
    });

    if (this.totalBilled <= 0) {
      this.isGraph = false;
    }
    this.formatDate(this.maxDate);
    this.percentage = ((this.maxAmount / this.totalBilled) * 100);
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
}
