import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailRolesComponent } from './detail/detail.component';
import { HomeRolesComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeRolesComponent },
  { path: 'new', component: DetailRolesComponent },
  { path: ':rol_id', component: DetailRolesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
