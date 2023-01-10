import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { DemoNgZorroAntdModule } from 'src/app/ng-zerro-ant.module';



@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    DemoNgZorroAntdModule
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
