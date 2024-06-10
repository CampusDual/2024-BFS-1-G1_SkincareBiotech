import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataAnalysisHomeComponent } from './data-analysis-home/data-analysis-home.component';
import { BilledAgeComponent } from './billed-age/billed-age.component';
import { BilledAgeRangeNewComponent } from './billed-age/billed-age-range-new/billed-age-range-new.component';
import { SellsByCategoryComponent } from './sells-by-category/sells-by-category.component';
import { SellsVisitsByPtoductComponent } from './sells-visits-by-ptoduct/sells-visits-by-ptoduct.component';

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
    path: "bycategory",
    component: SellsByCategoryComponent
  },
  {
    path: "sells-visits",
    component: SellsVisitsByPtoductComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataAnalysisRoutingModule { }
