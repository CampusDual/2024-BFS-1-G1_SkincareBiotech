import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OCurrencyInputComponent, OSlideToggleComponent, OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-products-new',
  templateUrl: './products-new.component.html',
  styleUrls: ['./products-new.component.css']
})
export class ProductsNewComponent implements OnInit{

  service: OntimizeService;

  constructor(
    private router: Router,
    protected injector: Injector
  ) {
    this.service = this.injector.get(OntimizeService)
  }
  ngOnInit(){ }
  onInsert(success: boolean) {
    if (success) {
      this.router.navigate(['/main/products']);
    }
  }

  onChange(event) {
  }

}
