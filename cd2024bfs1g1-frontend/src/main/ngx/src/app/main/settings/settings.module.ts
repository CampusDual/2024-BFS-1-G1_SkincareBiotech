import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';

import { SharedModule } from '../../shared/shared.module';
import { SettingsAccountComponent } from './account/account.component';
import { SettingsAppearanceComponent } from './appearance/appearance.component';
import { SettingsProfileComponent } from './profile/profile.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';


@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    SettingsRoutingModule
  ],
  declarations: [
    SettingsComponent,
    SettingsProfileComponent,
    SettingsAccountComponent,
    SettingsAppearanceComponent
  ]
})
export class SettingsModule { }
