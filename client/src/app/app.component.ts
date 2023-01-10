import { Component, ViewChild } from '@angular/core';
import { AlertType } from './shared/types/enums/alert.enum';
import { NotifierService } from 'angular-notifier';
import { AlertService } from './shared/services/alert/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('customNotification', { static: true }) customNotificationTmpl: any;
  private readonly notifier: NotifierService;
  alertType = AlertType;
  count = 0;

  constructor(notifierService: NotifierService, private alertService: AlertService) {
    this.notifier = notifierService;
  }

  ngAfterViewInit(): void {
    this.alertService.customNotificationTmpl = this.customNotificationTmpl;
  }
}
