import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommissionsHomeComponent } from './commissions-home/commissions-home.component';
import { CommissionDetailComponent } from './commission-detail/commission-detail.component';

const routes: Routes = [
    { path: '', component: CommissionsHomeComponent },
    { path: ':com_id', component: CommissionDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommissionsRoutingModule { }
