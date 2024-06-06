import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewAllergenComponent } from './new-allergen/new-allergen.component';
import { AllergenDetailsComponent } from './allergen-details/allergen-details.component';
import { AllergenHomeComponent } from './allergen-home/allergen-home.component';

const routes: Routes = [
  { path: '', component: AllergenHomeComponent },
  { path: 'new', component: NewAllergenComponent },
  { path: ':ALLER_ID', component: AllergenDetailsComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllergensRoutingModule { }
