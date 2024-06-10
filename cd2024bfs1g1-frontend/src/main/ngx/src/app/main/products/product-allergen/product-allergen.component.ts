import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-allergen',
  templateUrl: './product-allergen.component.html',
  styleUrls: ['./product-allergen.component.css']
})
export class ProductAllergenComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
 
  ) {
  }

}


