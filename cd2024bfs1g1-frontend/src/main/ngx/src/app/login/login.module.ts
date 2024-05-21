import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';

import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ClientRegisterComponent } from './client-register/client-register.component';

@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
    ClientRegisterComponent
  ]
})
export class LoginModule { }
