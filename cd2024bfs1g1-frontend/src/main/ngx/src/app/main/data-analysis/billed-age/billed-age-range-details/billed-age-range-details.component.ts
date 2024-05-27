import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billed-age-range-details',
  templateUrl: './billed-age-range-details.component.html',
  styleUrls: ['./billed-age-range-details.component.css']
})
export class BilledAgeRangeDetailsComponent {

  constructor(  
    private router: Router
  ) { }
  onUpdate(success: boolean) {
    if (success) {
      this.router.navigate(['/main/data-analysis/billed-age']);
    } 
  }
}
