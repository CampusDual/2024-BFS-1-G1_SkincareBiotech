import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ValidatorFn, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { OFormComponent } from 'ontimize-web-ngx';

@Component({
  selector: 'app-profile-home',
  templateUrl: './profile-home.component.html',
  styleUrls: ['./profile-home.component.css']
})
export class ProfileHomeComponent implements AfterViewInit {

  @ViewChild('form') form: OFormComponent;

  validatorsNameArray: ValidatorFn[] = [];
  validatorsBirthdateArray: ValidatorFn[] = [];
  validatorsPhoneArray: ValidatorFn[] = [];
  validatorsZipArray: ValidatorFn[] = [];

  constructor(
    protected sanitizer: DomSanitizer,
    protected router: Router,
  ) {
    this.validatorsZipArray.push(Validators.minLength(5));
    this.validatorsZipArray.push(Validators.maxLength(5));  
    this.validatorsZipArray.push(Validators.pattern('^[0-9]*$'));
    this.validatorsNameArray.push(Validators.pattern('^[a-zA-Z_ ]*$'));
    this.validatorsBirthdateArray.push(this.ageValidator());
    this.validatorsPhoneArray.push(Validators.pattern('^[6-9][0-9]{8}$'));
  }

  ngAfterViewInit(): void {
    this.form.queryData({ "USR_ID": 0 });

    // Aplica validadores a los controles del formulario
    this.applyValidatorsToFormControls();
  }

  ageValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const birthdate = new Date(control.value);
      const cutoffDate = new Date();
      cutoffDate.setFullYear(cutoffDate.getFullYear() - 18);

      return birthdate <= cutoffDate ? null : { 'ageValidator': { value: control.value } };
    };
  }

  private applyValidatorsToFormControls(): void {
    const birthdateControl = this.form.formGroup.get('UPR_BIRTHDATE');
    if (birthdateControl) {
      birthdateControl.setValidators([...this.validatorsBirthdateArray]);
      birthdateControl.updateValueAndValidity();
    }
  }

  getBirthdateErrorMessage(): string {
    const birthdateControl = this.form.formGroup.get('UPR_BIRTHDATE');
    if (birthdateControl && birthdateControl.hasError('ageValidator')) {
      return "{{ 'ERROR_BIRTHDATE' | oTranslate }}";
    }
    return '';
  }
}
