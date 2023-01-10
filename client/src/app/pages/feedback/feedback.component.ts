import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { DestroySubscription } from 'src/app/shared/helpers/destroy-subscription';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { AlertType } from 'src/app/shared/types/enums/alert.enum';
import { User } from 'src/app/shared/types/intefaces/auth.interface';
import { Feedback } from 'src/app/shared/types/intefaces/feedback.interface';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent extends DestroySubscription implements OnInit {
  form: FormGroup;
  onShowLoader = false;
  user!: User;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    public authService: AuthService,
    private feedbackService: FeedbackService
  ) {
    super();
    this.form = fb.group({
      message: fb.control(null, Validators.required),
      userName: fb.control(null)
    })
  }

  ngOnInit(): void {
    this.user = this.authService.user;
  }

  onSubmit() {
    this.onShowLoader = true;
    const controls = this.form.controls;
    if (this.form.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
      this.onShowLoader = false;
      return;
    }

    let data: Feedback;
    if (this.authService.isAuthorized) {
      data = { message: this.form.value.message, userName: this.user.name }
    } else {
      data = { ...this.form.value }
    }
    this.feedbackService
      .create(data)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        (data: { message: string }) => {
          this.onShowLoader = false;
          this.alertService.onShowAlert(data.message, AlertType.success);
          this.form.reset();
        },
        error => {
          this.onShowLoader = false;
          this.alertService.onShowAlert(error.error.message, AlertType.warning);
        }
      )
  }

}
