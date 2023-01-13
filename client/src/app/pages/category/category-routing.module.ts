import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/core/guard/role.guard';
import { Role } from 'src/app/shared/types/enums/role.enum';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { CategoryComponent } from './category.component';

const routes: Routes = [
  { 
    path: 'create', 
    component: CategoryCreateComponent,
    data: {
      allowedRoles: [
        Role.Admin
      ]
    },
    canActivate: [RoleGuard]
  },
  { path: ':id', component: CategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
