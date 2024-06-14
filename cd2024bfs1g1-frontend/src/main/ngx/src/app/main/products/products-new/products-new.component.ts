import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OCurrencyInputComponent, OFormComponent, OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-products-new',
  templateUrl: './products-new.component.html',
  styleUrls: ['./products-new.component.css']
})
export class ProductsNewComponent implements OnInit {

  @ViewChild('form') form: OFormComponent;
  @ViewChild('realPriceCurrency')
  realPriceCurrency: OCurrencyInputComponent;
  service: OntimizeService;
  commissionPlatform: number;
  commissionRedSys: number;
  proId: string;
  public priceUser: number;

  constructor(
    private router: Router,
    protected injector: Injector
  ) {
    this.service = this.injector.get(OntimizeService)
  }

  ngOnInit() {
    const conf = this.service.getDefaultServiceConfiguration('commissions');
    this.service.configureService(conf);
    this.service.query({}, ["COM_NAME", "COM_VALUE"], "commission")
      .subscribe((data) => {
        if (data.data.length > 0) {
          this.commissionRedSys = data.data.find((element) => (element.COM_NAME === "Redsys_commissions")).COM_VALUE;
          this.commissionPlatform = data.data.find((element) => (element.COM_NAME === "Platform_commissions")).COM_VALUE;
        }
      })
  }

  onInsert(success: any) {
    this.proId = success.PRO_ID;
    this.form.confirmExit = false;
    this.router.navigate(['/main/products/' + this.proId]);
  }

  changePrice(event) {
    if (!event) {
      this.priceUser = 0;
    } else {
      this.priceUser = (event / (1 - (this.commissionPlatform / 100))) / (1 - (this.commissionRedSys / 100));
    }
  }

}
