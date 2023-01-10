import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback.component';
import { FeedBackRoutingModule } from './feedback-routing.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { DemoNgZorroAntdModule } from 'src/app/ng-zerro-ant.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'src/app/shared/components/alert/alert.module';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
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
