import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-product-skin',
  templateUrl: './product-skin.component.html',
  styleUrls: ['./product-skin.component.css']
})
export class ProductSkinComponent {
  proId: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,

  ) {
    this.proId = parseInt(this.route.snapshot.paramMap.get('PRO_ID'));

  }

}
