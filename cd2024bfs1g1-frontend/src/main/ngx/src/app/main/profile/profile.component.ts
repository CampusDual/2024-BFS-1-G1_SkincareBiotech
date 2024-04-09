import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserInfoService } from '../../shared/services/user-info.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  public userInfo;
  constructor(public userInfoService: UserInfoService) {
    this.userInfo = this.userInfoService.getUserInfo();
  }

  ngOnInit() {
  }

}
