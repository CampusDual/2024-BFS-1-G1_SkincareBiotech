import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-allergen',
  templateUrl: './product-allergen.component.html',
  styleUrls: ['./product-allergen.component.css']
})
export class ProductAllergenComponent {

  proId: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
 
  ) {
    this.proId = parseInt(this.route.snapshot.paramMap.get('PRO_ID'));
 
  }
 
  onInsert(event) {
    this.router.navigate(['/main/products/'+this.proId+'/']);
  }

}


