import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewSellerComponent } from './new-seller/new-seller.component';
import { SellerDetailsComponent } from './seller-details/seller-details.component';

const routes: Routes = [
  { path: '', component: SellerDetailsComponent },
  { path: 'new', component: NewSellerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellersRoutingModule { }
