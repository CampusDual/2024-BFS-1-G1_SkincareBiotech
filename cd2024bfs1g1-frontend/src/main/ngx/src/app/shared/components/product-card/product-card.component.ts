import { Component, Input, OnInit, Injector } from '@angular/core';
import { OntimizeService } from 'ontimize-web-ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  service: OntimizeService;
  prodList: any = [];
  @Input() product;

  constructor(
    protected injector: Injector,
    protected sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.service = this.injector.get(OntimizeService)
  }

  public getImageSrc(base64: any): any {
    return base64 ? this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + base64) : './assets/images/no-image.png';
  }

}
