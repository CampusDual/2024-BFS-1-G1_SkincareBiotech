import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsStatsHomeComponent } from './products-stats-home/products-stats-home.component';

const routes: Routes = [
    { path: '', component: ProductsStatsHomeComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsStatsRoutingModule { }