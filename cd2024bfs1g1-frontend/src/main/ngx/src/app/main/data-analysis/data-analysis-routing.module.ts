import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataAnalysisHomeComponent } from './data-analysis-home/data-analysis-home.component';
import { SellsByCategoryComponent } from './sells-by-category/sells-by-category.component';

const routes: Routes = [
  {
    path: '',
    component: DataAnalysisHomeComponent
  },
  {
    path: "bycategory",
    component: SellsByCategoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataAnalysisRoutingModule { }
