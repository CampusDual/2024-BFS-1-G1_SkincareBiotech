import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'roles', loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule) },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'sellers', loadChildren: () => import('./sellers/sellers.module').then(m => m.SellersModule) },
  { path: 'allergens', loadChildren: () => import('./allergens/allergens.module').then(m => m.AllergensModule) },
  { path: 'commissions', loadChildren: () => import('./commissions/commissions.module').then(m => m.CommissionsModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
