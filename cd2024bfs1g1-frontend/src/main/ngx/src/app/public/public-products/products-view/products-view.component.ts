import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FilterExpressionUtils, Expression, OntimizeService, ORealInputComponent, OIntegerInputComponent, OGridComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})

export class ProductsViewComponent implements OnInit {

  @ViewChild('productsGrid') productGrid: OGridComponent

  service: OntimizeService;

  maxPrice: Expression;
  minPrice: Expression;
  maxSale: Expression;
  minSale: Expression;

  price: number;
  constructor(
    protected injector: Injector,
    protected sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {
    this.service = this.injector.get(OntimizeService)
  }

  searchQuery: string = ''; 
  products: any[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'];
      this.loadProducts();
      console.log(this.searchQuery);
    });
  }

  loadProducts() {  
    const conf = this.service.getDefaultServiceConfiguration('products');
    this.service.configureService(conf);
    const columns = [
      "PRO_ID",
      "PRO_NAME",
      "PRO_DESCRIPTION",
      "PRO_PRICE",
      "PRO_SALE",
      "DISCOUNT",
      "PRO_IMAGE"
    ];
    const filter = {
      "PRO_NAME":  "*" + this.searchQuery + "*"
    };
    const order = []
    this.service.advancedQuery(filter, columns, "productEnabled", null, 0, 5, order)
    .subscribe((data) => {
    if (data.data.length > 0) {
      this.productGrid.dataArray = data.data;
      console.log(this.productGrid.dataArray);
    }
  });
  
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
        if (fil.attr === 'BRA_ID') {
          filters.push(FilterExpressionUtils.buildExpressionEquals(fil.attr, fil.value));
        }
        if (fil.attr === 'PGE_ID') {
          filters.push(FilterExpressionUtils.buildExpressionEquals(fil.attr, fil.value));
        }
        if (fil.attr == 'PRO_MAX_PRICE') {
          let value: number = Number(fil.value);
          filters.push(FilterExpressionUtils.buildExpressionLessEqual("PRO_REAL_PRICE", value));
        }
        if (fil.attr == 'PRO_MIN_PRICE') {
          let value: number = Number(fil.value);
          filters.push(FilterExpressionUtils.buildExpressionMoreEqual("PRO_REAL_PRICE", value));
        }
      }
    });

    // Build complex expression
    if (filters.length > 0) {
      return filters.reduce((exp1, exp2) => FilterExpressionUtils.buildComplexExpression(exp1, exp2, FilterExpressionUtils.OP_AND));
      console.log(filters);
    } else {
      return null;
    }
  }



}
