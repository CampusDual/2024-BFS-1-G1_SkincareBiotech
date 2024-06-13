import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { AgeRangeConfigurationRoutingModule } from './age-range-configuration-routing.module';
import { AgeRangeHomeComponent } from './age-range-home/age-range-home.component';
import { AgeRangeNewComponent } from './age-range-new/age-range-new.component';


@NgModule({
  declarations: [
    AgeRangeHomeComponent,
    AgeRangeNewComponent
  ],
  imports: [
    CommonModule,
    AgeRangeConfigurationRoutingModule,
    OntimizeWebModule
  ]
})
export class AgeRangeConfigurationModule { }
