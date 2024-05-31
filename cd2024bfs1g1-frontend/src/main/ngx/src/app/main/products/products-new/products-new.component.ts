import { Component, Injector, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OCurrencyInputComponent, OSlideToggleComponent, OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-products-new',
  templateUrl: './products-new.component.html',
  styleUrls: ['./products-new.component.css']
})
export class ProductsNewComponent {

  @ViewChild("proSaleToggle")
  proSaleToggle: OSlideToggleComponent;

  @ViewChild("proSaleCurrency")
  proSaleCurrency: OCurrencyInputComponent;

  @ViewChild("proPriceCurrency")
  proPriceCurrency: OCurrencyInputComponent;

  service: OntimizeService;

  private commissionPlataform;
  private commissionRedSys;

  public priceUser;

  constructor(
    private router: Router,
    protected injector: Injector
  ) {
    this.service = this.injector.get(OntimizeService)
  }

  onInsert(success: boolean) {
    if (success) {
      this.router.navigate(['/main/products']);
    }
  }

  onChange(event) {
    if (!this.proSaleToggle.isChecked()) {
      this.proSaleCurrency.readOnly = true;
      this.proSaleCurrency.setValue(null);
    } else {
      this.proSaleCurrency.readOnly = false;
      this.proSaleCurrency.setEnabled(this.proSaleToggle.getValue());
    }
  }


  onPriceChanged(event) {
    if (!event) {
      this.priceUser = 0;
    } else {
      const conf = this.service.getDefaultServiceConfiguration('commissions');
      this.service.configureService(conf);
      this.service.query({}, ["COM_VALUE"], "commission")
        .subscribe((data) => {
          if (data.data.length > 0) {
            const commissionRedSys = data.data[0];
            const commissionPlataform = data.data[1];
            this.priceUser = Number(event) + (Number(event) * (commissionPlataform.COM_VALUE / 100));
            this.priceUser = this.priceUser + (this.priceUser * (commissionRedSys.COM_VALUE / 100));
            this.priceUser = parseFloat(this.priceUser.toFixed(2));
          }
        })
    }
  }

  onSaleChanged(event) {
      const conf = this.service.getDefaultServiceConfiguration('commissions');
      this.service.configureService(conf);
      this.service.query({}, ["COM_VALUE","COM_NAME"], "commission")
        .subscribe((data) => {
          if (data.data.length > 0) {
            const commissionRedSys = data.data[0];
            const commissionPlataform = data.data[1];
            this.priceUser = Number(event) + (Number(event) * (commissionPlataform.COM_VALUE / 100));
            this.priceUser = this.priceUser + (this.priceUser * (commissionRedSys.COM_VALUE / 100));
            this.priceUser = parseFloat(this.priceUser.toFixed(2));
          }
        })
  }
}
