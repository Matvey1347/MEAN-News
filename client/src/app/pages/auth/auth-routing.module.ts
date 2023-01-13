import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from 'src/app/core/guard/authorized.guard';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { 
    path: 'registration', 
    component: RegistrationComponent,
    canActivate: [AuthorizedGuard]
  },
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [AuthorizedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
