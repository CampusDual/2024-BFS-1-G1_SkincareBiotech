import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allergen-details',
  templateUrl: './allergen-details.component.html',
  styleUrls: ['./allergen-details.component.css']
})
export class AllergenDetailsComponent {

  constructor(
    private router: Router
  ) { }

  onUpdate(success: boolean) {
    if (success) {
      this.router.navigate(['/main/admin/allergens']);
    }
  }

}
