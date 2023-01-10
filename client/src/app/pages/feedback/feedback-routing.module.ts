import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/core/guard/role.guard';
import { Role } from 'src/app/shared/types/enums/role.enum';
import { FeedbackViewComponent } from './feedback-view/feedback-view.component';
import { FeedbackComponent } from './feedback.component';

const routes: Routes = [
  {
    path: '',
    component: FeedbackComponent,
    data: {
      allowedRoles: [
        Role.Autor,
        Role.User
      ]
    },
    canActivate: [RoleGuard]
  },
  {
    path: 'view',
    component: FeedbackViewComponent,
    data: {
      allowedRoles: [
        Role.Admin
      ]
    },
    canActivate: [RoleGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedBackRoutingModule { }
