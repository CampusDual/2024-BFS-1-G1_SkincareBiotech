import { Component, Injector, OnInit, Input } from '@angular/core';
import { OntimizeService } from 'ontimize-web-ngx';
import { PieChartConfiguration } from 'ontimize-web-ngx-charts';

@Component({
  selector: 'app-objetive-customers',
  templateUrl: './objetive-customers.component.html',
  styleUrls: ['./objetive-customers.component.css']
})
export class ObjetiveCustomersComponent implements OnInit {

  @Input() productId: number;

  data: any[] = [];
  service2: OntimizeService;
  pieParameters: PieChartConfiguration;
  colors = {};

  constructor(
    protected injector: Injector
  ) {
    this._pieConfiguration();
    this.service2 = this.injector.get(OntimizeService);
  }

  ngOnInit(): void {
    this.fetchCustomerData();
  }

  _pieConfiguration() {
    this.pieParameters = new PieChartConfiguration();
    this.pieParameters.showLeyend = true;
    this.pieParameters.legendPosition = 'right';
    this.colors = {
      domain: ['#31d4f8', '#2aaecb', '#1f6e9a', '#154865', '#0499ec', '#03649b', '#03649b']
    };
  }

  fetchCustomerData(): void {
    const conf = this.service2.getDefaultServiceConfiguration('allergen-products');
    this.service2.configureService(conf);
    this.service2.query(
      { 'pro_id': this.productId },
      ["pro_id", "objetivo_count", "no_recomendado_count", "alergia_count"],
      "getProductRecommendations"
    ).subscribe((data) => {
      if (data.data.length > 0) {
        this.loadChart(data.data);
      }
    });
  }

  loadChart(data: any): void {
    const event = data[0];
    const groupedData = [
      { name: 'Objetivo', value: event.objetivo_count },
      { name: 'No recomendado', value: event.no_recomendado_count },
      { name: 'Alergia', value: event.alergia_count }
    ];
    this.data = groupedData;
  }
}
