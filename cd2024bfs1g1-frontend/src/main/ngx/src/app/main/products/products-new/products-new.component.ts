import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OFormComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-products-new',
  templateUrl: './products-new.component.html',
  styleUrls: ['./products-new.component.css']
})
export class ProductsNewComponent {

@ViewChild('form') form: OFormComponent;

  proId: string;
  constructor(
    private router: Router
  ) {
    
  }


  onInsert(success: any) {
    const proId = success.PRO_ID;
    this.form.confirmExit = false;
    this.router.navigate(['/main/products/' + proId]);

    

  }

}
