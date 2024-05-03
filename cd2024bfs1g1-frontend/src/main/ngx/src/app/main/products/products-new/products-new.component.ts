import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-new',
  templateUrl: './products-new.component.html',
  styleUrls: ['./products-new.component.css']
})
export class ProductsNewComponent {

  constructor(
    private router: Router
  ) { }

  onInsert(success: boolean) {
    if (success) {
      this.router.navigate(['/main/products']);
    }
  }

}
