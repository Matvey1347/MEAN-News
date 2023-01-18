import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/core/guard/role.guard';
import { Role } from 'src/app/shared/types/enums/role.enum';
import { AllNewsWithFilterComponent } from './all-news-with-filter/all-news-with-filter.component';
import { NewsCreateComponent } from './news-create/news-create.component';
import { NewsComponent } from './news.component';

const routes: Routes = [
  { path: '', component: AllNewsWithFilterComponent },
  { 
    path: 'create', 
    component: NewsCreateComponent ,
    data: {
      allowedRoles: [
        Role.Autor
      ]
    },
    canActivate: [RoleGuard]
  },
  { path: ':id', component: NewsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
