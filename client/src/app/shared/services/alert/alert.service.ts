import { Injectable, TemplateRef } from '@angular/core';
import { AlertType } from '../../types/enums/alert.enum';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  count = 0;
  customNotificationTmpl!: TemplateRef<any>;
  constructor(private notifier: NotifierService) { }

  onShowAlert(message: string, type: AlertType,) {
    this.count++;
    this.notifier.show({
      message, type,
      template: this.customNotificationTmpl,
      id: `${this.count}`
    });
  }
}
