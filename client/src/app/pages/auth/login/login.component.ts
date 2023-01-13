import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { DestroySubscription } from 'src/app/shared/helpers/destroy-subscription';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertType } from 'src/app/shared/types/enums/alert.enum';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { User } from 'src/app/shared/types/intefaces/auth.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends DestroySubscription {
  loginForm: FormGroup;
  onShowLoader = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
  ) {
    super();
    this.loginForm = fb.group({
      'name': fb.control(null, Validators.required),
      'password': fb.control(null, Validators.required),
    })
  }

  onShowPassword(input: HTMLInputElement) {
    if (input.type === "password") {
      input.type = "text";
      this.showPassword = true;
    } else {
      input.type = "password";
      this.showPassword = false;
    }
  }

  onSubmit() {
    this.onShowLoader = true;
    const controls = this.loginForm.controls;
    if (this.loginForm.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
      this.onShowLoader = false;
      return;
    }
    this.authService
      .login(this.loginForm.value)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        (data: { user: User }) => {
          this.onShowLoader = false;
          localStorage.setItem('user', JSON.stringify(data.user));
          this.authService.userActions.next('');
          this.router.navigate(['/']);
          this.alertService.onShowAlert('Login successfully :)', AlertType.success);
        },
        error => {
          this.onShowLoader = false;
        }
      )
  }
}
