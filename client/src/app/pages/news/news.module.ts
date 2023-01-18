import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsRoutingModule } from './news-routing.module';
import { DemoNgZorroAntdModule } from 'src/app/ng-zerro-ant.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { NewsCreateModule } from './news-create/news-create.module';
import { AllNewsWithFilterModule } from './all-news-with-filter/all-news-with-filter.module';



@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    DemoNgZorroAntdModule,
    LoaderModule,
    NewsCreateModule,
    AllNewsWithFilterModule
  ]
})
export class NewsModule { }
