import { Component, OnInit } from '@angular/core';
import { FilterExpressionUtils, Expression, Util } from 'ontimize-web-ngx';

@Component({
  selector: 'home-users',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeUsersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  createFilter(values: Array<{ attr; value }>): Expression {
    // Prepare simple expressions from the filter components values
    let filters: Array<Expression> = [];
    values.forEach(fil => {
      if (Util.isDefined(fil.value)) {
        if (
          fil.attr === "name" ||
          fil.attr === "surname" ||
          fil.attr === "login"
        ) {
          filters.push(
            FilterExpressionUtils.buildExpressionLike(
              "usr_" + fil.attr,
              fil.value
            )
          );
        }

      }
    });

    // Build complex expression
    if (filters.length > 0) {
      return filters.reduce((exp1, exp2) =>
        FilterExpressionUtils.buildComplexExpression(
          exp1,
          exp2,
          FilterExpressionUtils.OP_AND
        )
      );
    } else {
      return null;
    }
  }

}
