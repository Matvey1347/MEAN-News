import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistrationComponent } from './pages/auth/registration/registration.component';
import { AutorComponent } from './pages/autor/autor.component';
import { CategoryCreateComponent } from './pages/category/category-create/category-create.component';
import { CategoryComponent } from './pages/category/category.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FeedbackViewComponent } from './pages/feedback/feedback-view/feedback-view.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { NewsCreateComponent } from './pages/news/news-create/news-create.component';
import { NewsComponent } from './pages/news/news.component';
import { NotAllowedComponent } from './pages/not-allowed/not-allowed.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'auth',
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./pages/category/category.module').then(
        (m) => m.CategoryModule
      ),
  },
  {
    path: 'news',
    loadChildren: () =>
      import('./pages/news/news.module').then(
        (m) => m.NewsModule
      ),
  },
  {
    path: 'autor',
    loadChildren: () =>
      import('./pages/autor/autor.module').then(
        (m) => m.AutorModule
      ),
  },
  {
    path: 'feedback',
    loadChildren: () =>
      import('./pages/feedback/feedback.module').then(
        (m) => m.FeedbackModule
      ),
  },
  {
    path: 'not-allowed',
    component: NotAllowedComponent
  },
  {
    path: '**', pathMatch: 'full',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
