import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsRoutingModule } from './news-routing.module';
import { DemoNgZorroAntdModule } from 'src/app/ng-zerro-ant.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';



@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    DemoNgZorroAntdModule,
    LoaderModule
  ]
})
export class NewsModule { }
