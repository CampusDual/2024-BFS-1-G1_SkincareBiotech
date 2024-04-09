import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { UntypedFormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { OFormComponent, OValidators } from 'ontimize-web-ngx';
import { UserInfoService } from '../../../shared/services/user-info.service';

@Component({
  selector: 'settings-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsAccountComponent {
  @ViewChild('form') form: OFormComponent;
  validatorsNewPasswordArray: ValidatorFn[] = [];
  constructor(public userInfoService: UserInfoService) {
    // check whether the entered password has a number
    this.validatorsNewPasswordArray.push(OValidators.patternValidator(/\d/, 'hasNumber'));
    // check whether the entered password has upper case letter
    this.validatorsNewPasswordArray.push(OValidators.patternValidator(/[A-Z]/, 'hasCapitalCase'));
    // check whether the entered password has small case character
    this.validatorsNewPasswordArray.push(OValidators.patternValidator(/[a-z]/, 'hasSmallCase'));
    // check whether the entered password has a special character
    this.validatorsNewPasswordArray.push(OValidators.patternValidator(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, 'hasSpecialCharacters'));
  }

  ngAfterViewInit() {
    const userInfo = this.userInfoService.getUserInfo();
    this.form.setData({ "usr_id": userInfo.usr_id });
  }

  newPasswordMatchValidator(control: UntypedFormControl): ValidationErrors {
    const newPassword = control.parent.controls['new_password'];
    const confirmNewPassword = control.parent.controls['confirm_new_password'];

    return newPassword && confirmNewPassword && newPassword.value === confirmNewPassword.value ? null : { matchNewPassword: true };
  }

  isChangePasswordButtonDisabled() {
    return this.form.formGroup.invalid;
  }

  changePassword() {
    this.form.update();
  }
}
