import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllergensRoutingModule } from './allergens-routing.module';
import { NewAllergenComponent } from './new-allergen/new-allergen.component';
import { AllergenDetailsComponent } from './allergen-details/allergen-details.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { AllergenHomeComponent } from './allergen-home/allergen-home.component';


@NgModule({
  declarations: [
    NewAllergenComponent,
    AllergenDetailsComponent,
    AllergenHomeComponent
  ],
  imports: [
    CommonModule,
    AllergensRoutingModule,
    OntimizeWebModule
  ]
})
export class AllergensModule { }
