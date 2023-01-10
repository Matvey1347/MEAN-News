import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsItemComponent } from './news-item.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';


@NgModule({
  declarations: [
    NewsItemComponent
  ],
  imports: [
    CommonModule,
    NzCardModule,
    NzIconModule,
    NzAvatarModule
  ],
  exports: [
    NewsItemComponent
  ]
})
export class NewsItemModule { }
