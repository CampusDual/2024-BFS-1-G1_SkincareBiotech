import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FilterExpressionUtils, Expression, OntimizeService, ORealInputComponent, OIntegerInputComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})

export class ProductsViewComponent implements OnInit {

  // @ViewChild ("maxPriceInput")
  // maxPriceInput : ORealInputComponent
  // @ViewChild ("minPriceInput")
  // minPriceInput : ORealInputComponent

  service: OntimizeService;

  maxPrice: Expression;
  minPrice: Expression;
  maxSale: Expression;
  minSale: Expression;

  price: number;
  constructor(
    protected injector: Injector,
    protected sanitizer: DomSanitizer
  ) {
    this.service = this.injector.get(OntimizeService)
   }
  
  ngOnInit(): void {

      // this.maxPriceInput = this.getPrice(false) ;
      // this.precioMinimo = this.getPrice(true) as number;

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
        if(fil.attr == 'PRO_MAX_PRICE'){
           this.maxPrice = FilterExpressionUtils.buildExpressionLessEqual("PRO_PRICE", fil.value);          
           this.maxSale = FilterExpressionUtils.buildExpressionLessEqual("PRO_SALE", fil.value);
          filters.push(FilterExpressionUtils.buildComplexExpression(this.maxPrice, this.maxSale, FilterExpressionUtils.OP_OR));
        }
        if(fil.attr == 'PRO_MIN_PRICE'){
          this.minPrice = FilterExpressionUtils.buildExpressionMoreEqual("PRO_PRICE", fil.value);
          this.minSale = FilterExpressionUtils.buildExpressionMoreEqual("PRO_SALE", fil.value);
          filters.push(FilterExpressionUtils.buildComplexExpression(this.minPrice, this.minSale, FilterExpressionUtils.OP_OR));
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


  // getPrice(orderColumn: boolean): any{
  //   const conf = this.service.getDefaultServiceConfiguration('products');
  //   this.service.configureService(conf);
  //   const columns = [
  //     "PRO_PRICE",
  //     "PRO_SALE"
  //   ];
  //   const filter = { "PRO_ENABLED": true };
  //   const order = [{ "columnName": "PRO_PRICE", "ascendent": orderColumn }];
  //   this.service.advancedQuery(filter, columns, "product", null, 0, 1, order)
  //     .subscribe((data) => {
  //       if (data.data.length > 0) {

  //         if(data.data[0].PRO_SALE !== null){
  //           this.price = data.data[0].PRO_SALE;
            
  //         }else{
  //           this.price = data.data[0].PRO_PRICE;
  //         }
  //       }
  //     }) 

  //     return this.price;
  // }

  
}
