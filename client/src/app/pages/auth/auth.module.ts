import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { NewsItemModule } from '../news/news-item/news-item.module';
import { DemoNgZorroAntdModule } from 'src/app/ng-zerro-ant.module';
import { LoginModule } from './login/login.module';
import { RegistrationModule } from './registration/registration.module';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  imports: [
    CommonModule,
    LoaderModule,
    NewsItemModule,
    DemoNgZorroAntdModule,
    LoginModule,
    RegistrationModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }