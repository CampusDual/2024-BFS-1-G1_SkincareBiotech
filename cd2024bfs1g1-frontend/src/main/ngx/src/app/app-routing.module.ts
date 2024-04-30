import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'ontimize-web-ngx';


export const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'main', canActivate: [AuthGuardService], loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) },
  { path: '**', redirectTo: '' }
];



const opt: ExtraOptions = {
  enableTracing: false
};

@NgModule({
  imports: [RouterModule.forRoot(routes, opt)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
