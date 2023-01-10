import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { NzIconModule } from 'ng-zorro-antd/icon';



@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    NzIconModule
  ],
  exports: [
    AlertComponent
  ]
})
export class AlertModule { }
