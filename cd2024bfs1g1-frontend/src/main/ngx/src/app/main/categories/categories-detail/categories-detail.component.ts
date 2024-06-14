import { Component } from '@angular/core';
import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorData } from 'ontimize-web-ngx';

@Component({
  selector: 'app-categories-detail',
  templateUrl: './categories-detail.component.html',
  styleUrls: ['./categories-detail.component.css']
})
export class CategoriesDetailComponent {

  constructor(
    private router: Router
  ) { }

  onUpdate(success: boolean) {
    if (success) {
      this.router.navigate(['/main/categories']);
    } 
  }

  catNameValidator(control: FormControl): ValidationErrors {
    let result = {};
    const regex = /^[A-Z][a-zA-Z0-9 ]*$/;
    if (control.value && !regex.test(control.value)) {
      result['requiredLowercaseA'] = true;
    }
    return result;
  }  

}
