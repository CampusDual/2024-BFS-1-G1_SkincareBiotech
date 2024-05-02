import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OFormComponent, OIntegerInputComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements AfterViewInit {

  productId: number;
  insertedData: any;

  @ViewChild("pro_id") pro_id: OIntegerInputComponent;
  @ViewChild("formOrder") formOrder: OFormComponent;
  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngAfterViewInit(): void {
    this.route.params.subscribe(params => {
      this.productId = Number(params['PRO_ID']);
      this.pro_id.setValue(this.productId);
    });
    
  }



  submitOrder(): void {

    this.formOrder.onInsert.subscribe(
      (data) => {

        this.router.navigate(['/order/details', data['ORD_ID']]);

      },
      (error) => {

        console.error(error);

      });

    this.formOrder.insert();

  }

}
