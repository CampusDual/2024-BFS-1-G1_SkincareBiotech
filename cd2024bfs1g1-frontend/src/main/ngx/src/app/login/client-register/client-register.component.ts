import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent {

  public registerForm: UntypedFormGroup = new UntypedFormGroup({});
  public userCtrl: UntypedFormControl = new UntypedFormControl('', Validators.required);
  public pwdCtrl: UntypedFormControl = new UntypedFormControl('', Validators.required);
  public usernameCtrl: UntypedFormControl = new UntypedFormControl('', Validators.required);
  public userSurnameCtrl: UntypedFormControl = new UntypedFormControl('', Validators.required);

  redirect = '/main';

  register() {
    throw new Error('Method not implemented.');
  }

}
