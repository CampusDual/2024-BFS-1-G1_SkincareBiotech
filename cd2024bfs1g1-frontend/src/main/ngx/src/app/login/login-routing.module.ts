import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { ClientRegisterComponent } from './client-register/client-register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: ClientRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
