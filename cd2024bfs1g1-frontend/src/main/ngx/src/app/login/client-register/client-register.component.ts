import { Component, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService, OTranslateService, OUserInfoService, OntimizeService, ServiceResponse } from 'ontimize-web-ngx';
import { MainService } from 'src/app/shared/services/main.service';
import { UserInfoService } from 'src/app/shared/services/user-info.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit {

  public registerForm: UntypedFormGroup = new UntypedFormGroup({});
  public userCtrl: UntypedFormControl = new UntypedFormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(16), Validators.pattern('^[a-zA-Z0-9]*$')]);
  public pwdCtrl: UntypedFormControl = new UntypedFormControl('', [Validators.required, Validators.minLength(8)]);
  public pwdCtrl2: UntypedFormControl = new UntypedFormControl('', [Validators.required, Validators.minLength(8)]);
  public usernameCtrl: UntypedFormControl = new UntypedFormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜçÇ]*$')]);
  public userSurnameCtrl: UntypedFormControl = new UntypedFormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜçÇ]*$')]);
  public userEmailCtrl: UntypedFormControl = new UntypedFormControl('', [Validators.required, Validators.email]);
  public userPhoneCtrl: UntypedFormControl = new UntypedFormControl('', Validators.pattern('^[0-9]{9}$'));

  service: OntimizeService;
  redirect = '';
  adminRole = 'admin';
  userRole = 'user';
  sellerRole = 'seller';

  constructor(
    private router: Router,
    protected injector: Injector,
    protected translate: OTranslateService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(MainService) private mainService: MainService,
    @Inject(OUserInfoService) private oUserInfoService: OUserInfoService,
    @Inject(UserInfoService) private userInfoService: UserInfoService,
    @Inject(DomSanitizer) private domSanitizer: DomSanitizer
  ) {
    this.service = this.injector.get(OntimizeService)
    this.translate = this.injector.get(OTranslateService);
  }

  ngOnInit(): void {
    this.registerForm.addControl('usr_login', this.userCtrl);
    this.registerForm.addControl('usr_password', this.pwdCtrl);
    this.registerForm.addControl('usr_password2', this.pwdCtrl2);
    this.registerForm.addControl('usr_name', this.usernameCtrl);
    this.registerForm.addControl('usr_surname', this.userSurnameCtrl);
    this.registerForm.addControl('usr_email', this.userEmailCtrl);
    this.registerForm.addControl('usr_phone', this.userPhoneCtrl);
  }

  register() {
    if (this.passwordMatchValidator() && this.registerForm.valid) {
      this.insertUser(this.userRole);
    } else {
      Swal.fire({
        title: "ERROR",
        text: "Formulario incorrecto",
        icon: 'error',
        confirmButtonText: "Aceptar",
        confirmButtonColor: '#f8b88c',
      });
    }
  }

  passwordMatchValidator(): boolean {
    return this.registerForm.value.usr_password === this.registerForm.value.usr_password2;
  }

  insertUser(userRole: string) {
    const login = this.registerForm.value.usr_login;
    const password = this.registerForm.value.usr_password;

    const data = {
      "USR_LOGIN": this.registerForm.value.usr_login,
      "USR_PASSWORD": this.registerForm.value.usr_password,
      "USR_NAME": this.registerForm.value.usr_name,
      "USR_SURNAME": this.registerForm.value.usr_surname,
      "USR_EMAIL": this.registerForm.value.usr_email,
      "USR_PHONE": this.registerForm.value.usr_phone,
    }

    const conf = this.service.getDefaultServiceConfiguration('users');
    this.service.configureService(conf);
    this.service.insert(data, "clientRole")
      .subscribe((resp) => {
        if (resp.code === 0) {

          this.registerLogin(login, password)

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
          text: "Duplicated user",
          icon: 'error',
          confirmButtonText: "Cancel",
          confirmButtonColor: '#f8b88c',
        });
        break;
      default: break;
    }
  }

  registerLogin(userName: string, password: string) {
    this.authService.login(userName, password)
      .subscribe(() => {
        this.loadUserInfo();
        this.router.navigate([this.redirect]);
      })
  }

  private loadUserInfo() {
    this.mainService.getUserInfo()
      .subscribe(
        (result: ServiceResponse) => {
          this.userInfoService.storeUserInfo(result.data);
          this.oUserInfoService.setUserInfo({
            username: result.data['usr_name'],
          });
        }
      );
  }
}