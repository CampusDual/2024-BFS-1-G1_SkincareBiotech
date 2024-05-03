import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})
export class ProductsDetailComponent {

  constructor(
    private router: Router
  ) { }

  onUpdate(success: boolean) {
    if (success) {
      this.router.navigate(['/main/products']);
    } 
  }

}
