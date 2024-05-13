import { Component, Injector, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FilterExpressionUtils, Expression, OntimizeService } from 'ontimize-web-ngx';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})

export class ProductsViewComponent implements OnInit {
  service: OntimizeService;
  maxPrice: number;
  constructor(
    protected injector: Injector,
    protected sanitizer: DomSanitizer
  ) {
    this.service = this.injector.get(OntimizeService)
   }
  
  ngOnInit(): void {

      const conf = this.service.getDefaultServiceConfiguration('products');
      this.service.configureService(conf);
      const columns = [
        "PRO_PRICE",
      ];
      const filter = { "PRO_ENABLED": true };
      const order = [{ "columnName": "PRO_PRICE", "ascendent": false }];
      this.service.advancedQuery(filter, columns, "product", null, 0, 1, order)
        .subscribe((data) => {
          if (data.data.length > 0) {
            this.maxPrice = data.data[0].PRO_PRICE;
          }
        })   

  }

  public getImageSrc(base64: string): any {
    return base64 ? this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + base64) : './assets/images/no-image.png';
  }

  filter(values: Array<{ attr, value }>): Expression {
    // Prepare simple expressions from the filter components values
    let filters: Array<Expression> = [];
    values.forEach(fil => {
      if (fil.value) {
        if (fil.attr === 'CAT_ID') {
          filters.push(FilterExpressionUtils.buildExpressionEquals(fil.attr, fil.value));
        }
        if(fil.attr ==='BRA_ID'){
          filters.push(FilterExpressionUtils.buildExpressionEquals(fil.attr, fil.value));
        }
        if(fil.attr == 'PRO_PRICE'){
          filters.push(FilterExpressionUtils.buildExpressionLessEqual(fil.attr, fil.value));
        }
      }
    });

    // Build complex expression
    if (filters.length > 0) {
      return filters.reduce((exp1, exp2) => FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND));
    } else {
      return null;
    }
  }




  
}
