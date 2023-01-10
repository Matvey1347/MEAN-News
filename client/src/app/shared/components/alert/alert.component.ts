import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AlertType } from '../../types/enums/alert.enum';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'vex-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})


export class AlertComponent implements OnChanges {
  @Input() message!: string;
  @Input() alertType?: AlertType;
  @Input() id!: string;
  
  title: string = '';

  constructor(private notifier: NotifierService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const indexTwoDots = this.message.indexOf(':');
    if (indexTwoDots !== -1) {
      this.title = this.message.slice(0, indexTwoDots);
      this.message = this.message.slice(indexTwoDots);
    } else {
      this.title = this.message;
      this.message = '';
    }
  }

  hiddenAlert() {
    this.notifier.hide(this.id);
  }
}