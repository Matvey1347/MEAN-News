import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoNgZorroAntdModule } from 'src/app/ng-zerro-ant.module';
import { FeedbackComponent } from './feedback.component';
import { FeedBackRoutingModule } from './feedback-routing.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { AlertModule } from 'src/app/shared/components/alert/alert.module';
import { FeedbackViewModule } from './feedback-view/feedback-view.module';



@NgModule({
  declarations: [
    FeedbackComponent
  ],
  imports: [
    CommonModule,
    FeedBackRoutingModule,
    FeedbackViewModule,
    LoaderModule,
    DemoNgZorroAntdModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
  ]
})
export class FeedbackModule { }
