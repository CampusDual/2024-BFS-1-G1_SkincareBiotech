import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-rejected',
  templateUrl: './order-rejected.component.html',
  styleUrls: ['./order-rejected.component.css']
})
export class OrderRejectedComponent {

  constructor(
    private router: Router
  ) {
  }

  product: any = null;

  returnPaymentRejected(): void {
    this.router.navigate([""]);
  }

}
