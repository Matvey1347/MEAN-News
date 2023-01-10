import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { DemoNgZorroAntdModule } from 'src/app/ng-zerro-ant.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'src/app/shared/components/alert/alert.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    LoaderModule  
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
