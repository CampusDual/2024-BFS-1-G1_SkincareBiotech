import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-skin-types-new',
  templateUrl: './skin-types-new.component.html',
  styleUrls: ['./skin-types-new.component.css']
})
export class SkinTypesNewComponent {
  constructor(
    private router: Router
  ) {     
    this.router.navigate(['/main/skin-types/new'], { queryParams: { isdetail: 'true' } });
}
}
