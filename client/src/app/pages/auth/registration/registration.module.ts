import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { AlertModule } from 'src/app/shared/components/alert/alert.module';
import { DemoNgZorroAntdModule } from 'src/app/ng-zerro-ant.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';



@NgModule({
  declarations: [
    RegistrationComponent
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
    RegistrationComponent
  ]
})
export class RegistrationModule { }
