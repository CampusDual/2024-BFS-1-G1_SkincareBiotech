import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'ontimize-web-ngx';

import { MainComponent } from './main.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
      { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
      { path: 'profile', component: ProfileComponent },
      { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
      { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)},
      { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)},
      { path: 'data-analysis', loadChildren: () => import('./data-analysis/data-analysis.module').then(m => m.DataAnalysisModule)},
      { path: 'skin-types', loadChildren: () => import('./skin-types/skin-types.module').then(m => m.SkinTypesModule)},
      { path: 'brands', loadChildren: () => import('./brands/brands.module').then(m => m.BrandsModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
