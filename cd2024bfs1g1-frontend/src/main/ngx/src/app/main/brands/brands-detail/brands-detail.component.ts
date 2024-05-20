import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brands-detail',
  templateUrl: './brands-detail.component.html',
  styleUrls: ['./brands-detail.component.css']
})
export class BrandsDetailComponent {

  constructor(
    private router: Router
  ) { }

  onUpdate(success: boolean) {
    if (success) {
      this.router.navigate(['/main/brands']);
    } 
  }

}
