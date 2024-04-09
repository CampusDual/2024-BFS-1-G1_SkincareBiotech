import { HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { OntimizeEEService, AppConfig, AuthService } from 'ontimize-web-ngx';
import { Observable } from 'rxjs';

@Injectable()
export class MainService extends OntimizeEEService {
  private appConfig: AppConfig;

  constructor(protected injector: Injector) {
    super(injector);
    this.appConfig = injector.get(AppConfig);
  }

  public buildHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': 'Bearer ' + this.authService.getSessionInfo().id
    });
    return headers;
  }

  public getUserInfo() : Observable<any> {
    const options = { headers: this.buildHeaders() };
    const requestBody = {};
    return this.httpClient.post(
      this._appConfig.apiEndpoint + '/users/loginUser/search',
      requestBody,
      options);
  }
}
