import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { NewOrderDetailsComponent } from '../orders/new-order-details/new-order-details.component';
import { ProfileAllergenUserComponent } from './profile-allergen-user/profile-allergen-user.component';

const routes: Routes = [
  { path: '', component: ProfileHomeComponent },
  { path:'allergen-users/new', component:ProfileAllergenUserComponent},
  { path: ':ORD_ID', component: NewOrderDetailsComponent },
  { path: ':ORD_ID/:PRO_ID', redirectTo: '/:PRO_ID',}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
