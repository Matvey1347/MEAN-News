import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from 'src/app/ng-zerro-ant.module';
import { NewsCreateComponent } from './news-create.component';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { AlertModule } from 'src/app/shared/components/alert/alert.module';


@NgModule({
  declarations: [
    NewsCreateComponent
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
    NewsCreateComponent
  ]
})
export class NewsCreateModule { }
