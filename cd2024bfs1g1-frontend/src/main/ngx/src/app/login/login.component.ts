import { DomSanitizer } from '@angular/platform-browser';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, NavigationService, ServiceResponse, OUserInfoService, OntimizeService } from 'ontimize-web-ngx';
import { Observable } from 'rxjs';
import { MainService } from '../shared/services/main.service';
import { UserInfoService } from '../shared/services/user-info.service';
import { userRoleName, sellerRoleName, adminRoleName } from '../shared/constants';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  public loginForm: UntypedFormGroup = new UntypedFormGroup({});
  public userCtrl: UntypedFormControl = new UntypedFormControl('', Validators.required);
  public pwdCtrl: UntypedFormControl = new UntypedFormControl('', Validators.required);

  public sessionExpired = false;
  public sessionNotStarted = false;
  private redirect = '/main';

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    @Inject(NavigationService) private navigationService: NavigationService,
    @Inject(AuthService) private authService: AuthService,
    @Inject(MainService) private mainService: MainService,
    @Inject(OUserInfoService) private oUserInfoService: OUserInfoService,
    @Inject(UserInfoService) private userInfoService: UserInfoService,
    @Inject(DomSanitizer) private domSanitizer: DomSanitizer,
  ) {
    const qParamObs: Observable<any> = this.actRoute.queryParams;
    qParamObs.subscribe(params => {
      if (params) {
        if (params['session-expired']) {
          this.sessionExpired = (params['session-expired'] === 'true');
          this.authService.clearSessionData();
        } else if (params['session-not-started']) {
          this.sessionNotStarted = (params['session-not-started'] === 'true');
        } else {
          if (params['redirect']) {
            this.redirect = params['redirect'];
          }
          this.sessionExpired = false;
        }
      }
    });
  }

  ngOnInit(): any {
    this.navigationService.setVisible(false);

    this.loginForm.addControl('username', this.userCtrl);
    this.loginForm.addControl('password', this.pwdCtrl);

    if (this.authService.isLoggedIn()) {
      this.router.navigate([this.redirect]);
    } else {
      this.authService.clearSessionData();
    }
  }

  public login() {
    const userName = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    if (userName && userName.length > 0 && password && password.length > 0) {
      const self = this;
      this.authService.login(userName, password)
        .subscribe(() => {
          self.sessionExpired = false;
          this.loadUserInfo((data) => {
            this.mainService.getUserRolName().subscribe((rol) => {
              if (rol.ROLE_NAME === userRoleName) {
                self.router.navigate(['']);
              } else if (rol.ROLE_NAME === sellerRoleName || rol.ROLE_NAME === adminRoleName) {
                self.router.navigate([this.redirect]);
              } else {
                self.router.navigate(['']);
              }
            });
          });
        }, this.handleError);
    }
  }

  private loadUserInfo(cb) {
    this.mainService.getUserInfo()
      .subscribe(
        (result: ServiceResponse) => {
          cb(result)
          this.userInfoService.storeUserInfo(result.data);
          let avatar = './assets/images/user_profile.png';
          if (result.data['usr_photo']) {
            (avatar as any) = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/*;base64,' + result.data['usr_photo']);
          }
          this.oUserInfoService.setUserInfo({
            username: result.data['usr_name'],
            avatar: avatar
          });
        }
      );
  }

  private handleError(error) {
    switch (error.status) {
      case 401:
        console.error('Email or password is wrong.');
        break;
      default: break;
    }
  }
}
