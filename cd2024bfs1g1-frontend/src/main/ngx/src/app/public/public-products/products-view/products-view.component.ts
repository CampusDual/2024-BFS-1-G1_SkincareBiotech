import {  AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FilterExpressionUtils, Expression, OntimizeService, ORealInputComponent, OIntegerInputComponent, OGridComponent, OTextInputComponent } from 'ontimize-web-ngx';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})

export class ProductsViewComponent implements OnInit {

  @ViewChild('nameFilter') nameFilter: OTextInputComponent

  service: OntimizeService;

  maxPrice: Expression;
  minPrice: Expression;
  maxSale: Expression;
  minSale: Expression;
  nameFilterValue: string;
  price: number;
  searchQuery: string = '';
  products: any[] = [];
  constructor(
    protected injector: Injector,
    protected sanitizer: DomSanitizer,
    private dataService: DataService
  ) {
    this.service = this.injector.get(OntimizeService)
  }
  
  ngOnInit(): void {
    this.dataService.search.subscribe(value =>{
      this.searchQuery = value;
      this.loadNameFilter();
    });
  }
  public getImageSrc(base64: string): any {
    return base64 ? this.sanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + base64) : './assets/images/no-image.png';
  }

  loadNameFilter(){
    if(this.searchQuery !== undefined){
      this.nameFilterValue = this.searchQuery;
    }
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
        if (fil.attr === 'SKIN_ID') {
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
        if(fil.attr == 'PRO_NAME'){
          filters.push(FilterExpressionUtils.buildExpressionLike(fil.attr, fil.value))
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
