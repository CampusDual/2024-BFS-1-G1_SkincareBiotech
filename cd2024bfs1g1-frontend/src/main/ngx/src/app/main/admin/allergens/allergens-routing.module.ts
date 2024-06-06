import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewAllergenComponent } from './new-allergen/new-allergen.component';
import { AllergenDetailsComponent } from './allergen-details/allergen-details.component';

const routes: Routes = [
  { path: '', component: AllergenDetailsComponent },
  { path: 'new', component: NewAllergenComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllergensRoutingModule { }
