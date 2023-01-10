import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackViewComponent } from './feedback-view.component';
import { DemoNgZorroAntdModule } from 'src/app/ng-zerro-ant.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';



@NgModule({
  declarations: [
    FeedbackViewComponent
  ],
  imports: [
    CommonModule,
    DemoNgZorroAntdModule,
    LoaderModule
  ],
  exports: [
    FeedbackViewComponent
  ]
})
export class FeedbackViewModule { }
