import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-allergen',
  templateUrl: './new-allergen.component.html',
  styleUrls: ['./new-allergen.component.css']
})

export class NewAllergenComponent {

  constructor(
    private router: Router
  ) 
  {this.router.navigate([router.routerState.snapshot.url], { queryParams: { isdetail: 'true' } });
}

  onInsert(success: boolean) {
    if (success) {
      this.router.navigate(['/main/admin/allergens']);
    }
  }

}
