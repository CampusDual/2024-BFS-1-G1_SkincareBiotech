import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkinTypesRoutingModule } from './skin-types-routing.module';
import { SkinTypesHomeComponent } from './skin-types-home/skin-types-home.component';


@NgModule({
  declarations: [
    SkinTypesHomeComponent
  ],
  imports: [
    CommonModule,
    SkinTypesRoutingModule
  ]
})
export class SkinTypesModule { }
