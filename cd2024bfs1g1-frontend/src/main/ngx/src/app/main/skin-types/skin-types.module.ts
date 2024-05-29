import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkinTypesRoutingModule } from './skin-types-routing.module';
import { SkinTypesHomeComponent } from './skin-types-home/skin-types-home.component';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { SkinTypesDetailComponent } from './skin-types-detail/skin-types-detail.component';
import { SkinTypesNewComponent } from './skin-types-new/skin-types-new.component';


@NgModule({
  declarations: [
    SkinTypesHomeComponent,
    SkinTypesDetailComponent,
    SkinTypesNewComponent
  ],
  imports: [
    CommonModule,
    SkinTypesRoutingModule,
    OntimizeWebModule
  ]
})
export class SkinTypesModule { }
