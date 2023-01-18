import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllNewsWithFilterComponent } from '../all-news-with-filter/all-news-with-filter.component';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { DemoNgZorroAntdModule } from 'src/app/ng-zerro-ant.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'src/app/shared/components/alert/alert.module';



@NgModule({
  declarations: [
    AllNewsWithFilterComponent
  ],
  imports: [
    CommonModule,
    LoaderModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
  ],
  exports: [
    AllNewsWithFilterComponent
  ]
})
export class AllNewsWithFilterModule { }
