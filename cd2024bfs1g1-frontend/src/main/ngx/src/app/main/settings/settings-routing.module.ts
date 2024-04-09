import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsAccountComponent } from './account/account.component';
import { SettingsAppearanceComponent } from './appearance/appearance.component';
import { SettingsProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings.component';


const routes: Routes = [
  {
    path: '', component: SettingsComponent, children: [
      { path: '', redirectTo:'profile' },
      { path: 'profile', component: SettingsProfileComponent },
      { path: 'account', component: SettingsAccountComponent },
      { path: 'appearance', component: SettingsAppearanceComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
