import { Component, Injector } from '@angular/core';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-data-analysis-home',
  templateUrl: './data-analysis-home.component.html',
  styleUrls: ['./data-analysis-home.component.css']
})

export class DataAnalysisHomeComponent {


  maxDate: number;
  maxDay: number;
  maxMonth: string;
  totalBilled: number = 0;
  isGraph: boolean = true;
  maxAmount: number = 0;
  percentage: number;

  constructor(
    protected injector: Injector,
    protected languageService: LanguageService,
  ) {
    this.languageService.getLanguage();
  }
  
  ngOnDestroy(): void {
    this.languageService.ngOnDestroy();
  }
  loadDataAnalysis(event: any) {

    event.forEach(item => {
      this.totalBilled += item.AMOUNT_PRICE;
      if (item.AMOUNT_PRICE > this.maxAmount) {
        this.maxAmount = item.AMOUNT_PRICE;
        this.maxDate = item.ORD_DATE;
      }
    })

    if (this.totalBilled <= 0) {
      this.isGraph = false;
    }
    this.formatDate(this.maxDate);
    this.percentage = ((this.maxAmount / this.totalBilled) * 100);
  }

  private formatDate(date: number) {
    const newDate = new Date(date);
    this.maxDay = newDate.getDate();

    const idiomCode = this.languageService.getIdiomCode();
    let monthFormatter = new Intl.DateTimeFormat(idiomCode, { month: 'long' });

    this.maxMonth = monthFormatter.format(newDate);

  }

}
