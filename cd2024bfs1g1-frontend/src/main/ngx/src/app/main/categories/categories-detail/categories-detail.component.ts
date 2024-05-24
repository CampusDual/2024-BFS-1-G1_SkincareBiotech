import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-detail',
  templateUrl: './categories-detail.component.html',
  styleUrls: ['./categories-detail.component.css']
})
export class CategoriesDetailComponent {

  constructor(
    private router: Router
  ) { }

  onUpdate(success: boolean) {
    if (success) {
      this.router.navigate(['/main/categories']);
    } 
  }

}
