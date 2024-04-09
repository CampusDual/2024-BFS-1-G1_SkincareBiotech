import { Component, ChangeDetectionStrategy, ViewChild, ViewEncapsulation } from '@angular/core';
import { OFormComponent } from 'ontimize-web-ngx';
import { UserInfoService } from '../../../shared/services/user-info.service';

@Component({
  selector: 'settings-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsProfileComponent {

  @ViewChild('form') form: OFormComponent;

  constructor(public userInfoService: UserInfoService) { }
  ngAfterViewInit() {
    const userInfo = this.userInfoService.getUserInfo();
    this.form.queryData({ "usr_id": userInfo.usr_id });
  }

  updateProfile() {
    this.form.update();
   }

  isUpdatateButtonDisabled(){
    return !(this.form.isInitialStateChanged())
  }
}
