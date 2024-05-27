import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataAnalysisHomeComponent } from './data-analysis-home/data-analysis-home.component';
import { BilledAgeComponent } from './billed-age/billed-age.component';
import { BilledAgeRangeNewComponent } from './billed-age/billed-age-range-new/billed-age-range-new.component';
import { BilledAgeRangeDetailsComponent } from './billed-age/billed-age-range-details/billed-age-range-details.component';

const routes: Routes = [
  {
    path: '',
    component: DataAnalysisHomeComponent
  },
  {
    path: 'billed-age',
    component: BilledAgeComponent
  },
  {
    path: "billed-age/new",
    component: BilledAgeRangeNewComponent
  },
  {
    path: 'billed-age/:GBA_ID',
    component: BilledAgeRangeDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataAnalysisRoutingModule { }
