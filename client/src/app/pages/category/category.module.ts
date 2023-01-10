import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CategoryRoutingModule } from './category-routing.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { NewsItemModule } from '../news/news-item/news-item.module';
import { DemoNgZorroAntdModule } from 'src/app/ng-zerro-ant.module';



@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    LoaderModule,
    NewsItemModule,
    DemoNgZorroAntdModule
  ],
  exports: [
    CategoryComponent
  ]
})
export class CategoryModule { }
