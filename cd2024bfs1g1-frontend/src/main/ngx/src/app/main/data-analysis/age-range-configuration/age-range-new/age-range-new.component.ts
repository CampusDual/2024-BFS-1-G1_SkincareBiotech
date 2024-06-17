import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-age-range-new',
  templateUrl: './age-range-new.component.html',
  styleUrls: ['./age-range-new.component.css']
})
export class AgeRangeNewComponent {
  constructor(
    private router: Router
  ) {
    this.router.navigate([router.routerState.snapshot.url], { queryParams: { isdetail: 'true' } });
  }
}