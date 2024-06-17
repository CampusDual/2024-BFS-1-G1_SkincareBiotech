import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-new',
  templateUrl: './brand-new.component.html',
  styleUrls: ['./brand-new.component.css']
})
export class BrandNewComponent {
 constructor(
    private router: Router
  ) {
    this.router.navigate([router.routerState.snapshot.url], { queryParams: { isdetail: 'true' } });

   }



onInsert(success: boolean) {
    if (success) {
      this.router.navigate(['/main/brands']);
    }
  }

}
