import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-new',
  templateUrl: './brand-new.component.html',
  styleUrls: ['./brand-new.component.css']
})
export class BrandNewComponent {
 constructor(
    private router: Router
  ) { }

onInsert(success: boolean) {
    if (success) {
      this.router.navigate(['/main/brands']);
    }
  }

}
