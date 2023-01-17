import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsRoutingModule } from './news-routing.module';
import { DemoNgZorroAntdModule } from 'src/app/ng-zerro-ant.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { NewsCreateModule } from './news-create/news-create.module';



@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    DemoNgZorroAntdModule,
    LoaderModule,
    NewsCreateModule
  ]
})
export class NewsModule { }
