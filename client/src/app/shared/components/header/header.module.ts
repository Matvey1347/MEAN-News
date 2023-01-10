import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';

import { LoaderModule } from '../loader/loader.module';
import { DemoNgZorroAntdModule } from 'src/app/ng-zerro-ant.module';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    LoaderModule,
    RouterModule,
    DemoNgZorroAntdModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
