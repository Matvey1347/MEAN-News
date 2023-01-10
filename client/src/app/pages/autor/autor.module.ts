import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutorComponent } from './autor.component';
import { RouterModule } from '@angular/router';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { NewsItemModule } from '../news/news-item/news-item.module';
import { AutorRoutingModule } from './autor-routing.module';
import { DemoNgZorroAntdModule } from 'src/app/ng-zerro-ant.module';
import { NzIconModule } from 'ng-zorro-antd/icon';



@NgModule({
  declarations: [
    AutorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LoaderModule,
    NewsItemModule,
    AutorRoutingModule,
    DemoNgZorroAntdModule,
    NzIconModule
  ]
})
export class AutorModule { }
