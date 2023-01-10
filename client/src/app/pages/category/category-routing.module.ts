import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryComponent } from './category.component';

const routes: Routes = [
  { path: ':id', component: CategoryComponent },
  { path: 'create', component: CategoryCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
