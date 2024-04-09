import { Injectable, Injector } from "@angular/core";
import { AppConfig, AuthService, Config } from "ontimize-web-ngx";

export const USER_INFO_KEY = 'user_info';
export type UserInfo = {
  data: any;
};

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private _config: Config;
  public _localStorageKey: string;


  constructor(protected injector: Injector) {
    const authService = this.injector.get(AuthService);
    const self = this;

    authService.onLogout.subscribe(resp => {
      self.storeUserInfo({});
    });

    this._config = this.injector.get(AppConfig).getConfiguration();
    this._localStorageKey = this._config.uuid;

  }

  public getUserInfo(): any {
    const info = localStorage.getItem(this._localStorageKey);
    if (!info) {
      return {};
    }
    const stored = JSON.parse(info);
    return stored[USER_INFO_KEY] || {};
  }

  public storeUserInfo(userInfo: any): void {

      const info = localStorage.getItem(this._localStorageKey);
      let stored = null;
      if (info && info.length > 0) {
        stored = JSON.parse(info);
      } else {
        stored = {};
      }
      stored[USER_INFO_KEY] = userInfo;
      localStorage.setItem(this._localStorageKey, JSON.stringify(stored));

  }
}
