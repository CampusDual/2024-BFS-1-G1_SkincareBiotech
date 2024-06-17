import { Component, Injector } from '@angular/core';
import { UntypedFormGroup, FormControl, ValidationErrors, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { OTranslateService, OntimizeService } from 'ontimize-web-ngx';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-seller',
  templateUrl: './new-seller.component.html',
  styleUrls: ['./new-seller.component.css']
})
export class NewSellerComponent {

  public registerForm: UntypedFormGroup = new UntypedFormGroup({});


  service: OntimizeService;

  userRole = 'user';


  constructor(
    private router: Router,
    protected injector: Injector,
    protected translate: OTranslateService,

  ) {
    this.service = this.injector.get(OntimizeService)
    this.translate = this.injector.get(OTranslateService);
    this.router.navigate([router.routerState.snapshot.url], { queryParams: { isdetail: 'true' } });

  }

  register() {
    if (this.registerForm.valid) {
      this.insertSeller();
    }else{
        Swal.fire({
          title: "ERROR",
          icon: 'error',
          confirmButtonColor: '#f8b88c',
        });
      }
    }
  


  insertSeller() {

    const data = {
      "USR_LOGIN": this.registerForm.value.usr_login,
      "USR_PASSWORD": this.registerForm.value.usr_password,
      "USR_NAME": this.registerForm.value.usr_name,
      "USR_SURNAME": this.registerForm.value.usr_surname,
      "USR_EMAIL": this.registerForm.value.usr_email,
      "USR_PHONE": this.registerForm.value.usr_phone,
    }

    const conf = this.service.getDefaultServiceConfiguration('sellers');
    this.service.configureService(conf);
    this.service.insert(data, "sellerRole")
      .subscribe((resp) => {
        if (resp.code === 0) {

          const title = this.translate.get('CONFIRMATION_REGISTER_TITLE');
          const text = this.translate.get('CONFIRMATION_REGISTER_TEXT');
          const button = this.translate.get('CONFIRMATION_REGISTER_BUTTON');

          Swal.fire({
            title: title,
            text: text,
            icon: 'success',
            confirmButtonText: button,
            confirmButtonColor: '#f8b88c',
          });
        }
      }, this.handleError)
  }

  private handleError(error) {

    switch (error.status) {
      case 500:
        Swal.fire({
          title: "ERROR",
          text: "Duplicated seller",
          icon: 'error',
          confirmButtonText: "Cancel",
          confirmButtonColor: '#f8b88c',
        });
        break;
      default: break;
    }
  }

  onInsert(success: boolean) {
    if (success) {
      this.router.navigate(['/main/admin/sellers']);
    }
  }

  /*
    ---RegEx Validators
  */

  sellerUsernameValidator(control: FormControl): ValidationErrors {
    let result = {};
    const regex = /^\S+$/
    if (control.value && !regex.test(control.value)) {
      result['requiredUsername'] = true;
    }
    return result;
  }

  sellerSpaceValidator(control: FormControl): ValidationErrors | null {
    let result: ValidationErrors | null = null;
    const regex = /^\s/;
    if (control.value && regex.test(control.value)) {
      result = { 'spaceValidator': true };
    }
    return result;
  }

  sellerPhoneValidator(control: FormControl): ValidationErrors {
    let result = {};
    const regex = /^\d{9}$/
    if (control.value && !regex.test(control.value)) {
      result['requiredPhonenum'] = true;
    }
    return result;
  }

}

