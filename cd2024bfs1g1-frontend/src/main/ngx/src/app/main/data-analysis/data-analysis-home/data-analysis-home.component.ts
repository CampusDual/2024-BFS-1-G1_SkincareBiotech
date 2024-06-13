import { Component} from '@angular/core';

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

  constructor() {
  }

  loadDataAnalysis(event: any){

    console.log(event)
    event.forEach(item => {
      this.totalBilled += item.AMOUNT_PRICE;
      if(item.AMOUNT_PRICE > this.maxAmount){
        this.maxAmount = item.AMOUNT_PRICE;
        this.maxDate = item.ORD_DATE;
      }
    })
    
    if(this.totalBilled <= 0) {
      this.isGraph=false;
    }
    this.formatDate(this.maxDate);
    this.percentage = ((this.maxAmount / this.totalBilled) * 100);
  }

  private formatDate(date: number){
    const newDate = new Date(date);
    this.maxDay = newDate.getDate();
    const monthFormatter = new Intl.DateTimeFormat('es-ES', { month: 'long' });
    this.maxMonth = monthFormatter.format(newDate);
  }

}
