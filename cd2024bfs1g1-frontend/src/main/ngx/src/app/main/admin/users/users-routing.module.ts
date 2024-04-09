import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailUsersComponent } from './detail/detail.component';
import { HomeUsersComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeUsersComponent },
  { path: 'new', component: DetailUsersComponent },
  { path: ':usr_id', component: DetailUsersComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
