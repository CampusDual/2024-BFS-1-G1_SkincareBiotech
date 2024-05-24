import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-new',
  templateUrl: './categories-new.component.html',
  styleUrls: ['./categories-new.component.scss']
})
export class CategoriesNewComponent{

  constructor(
    private router: Router
  ) { }

onInsert(success: boolean) {
    if (success) {
      this.router.navigate(['/main/categories']);
    }
  }

}
