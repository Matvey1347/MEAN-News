import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { NewsItemModule } from '../news/news-item/news-item.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { DemoNgZorroAntdModule } from 'src/app/ng-zerro-ant.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    NewsItemModule,
    DemoNgZorroAntdModule,
    LoaderModule
  ]
})
export class DashboardModule { }
