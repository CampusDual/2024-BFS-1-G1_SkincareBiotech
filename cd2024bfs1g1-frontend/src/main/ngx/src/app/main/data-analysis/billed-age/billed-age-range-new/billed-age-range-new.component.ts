import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billed-age-range-new',
  templateUrl: './billed-age-range-new.component.html',
  styleUrls: ['./billed-age-range-new.component.css']
})
export class BilledAgeRangeNewComponent {

  constructor(
    private router: Router
  ) { }

    onInsert(success: boolean) {
    if (success) {
      this.router.navigate(['/main/data-analysis/billed-age']);
    }
  }
}
