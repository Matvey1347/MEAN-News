import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';



@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    NzIconModule,
    NzSpinModule
  ], 
  exports: [
    LoaderComponent
  ]
})
export class LoaderModule { }
