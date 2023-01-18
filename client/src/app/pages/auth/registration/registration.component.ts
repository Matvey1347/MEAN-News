import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DestroySubscription } from 'src/app/shared/helpers/destroy-subscription';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { AlertType } from 'src/app/shared/types/enums/alert.enum';
import { User } from 'src/app/shared/types/intefaces/auth.interface';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent extends DestroySubscription {
  @ViewChild('input') inputRef!: ElementRef;

  registrationForm: FormGroup;
  onShowLoader = false;
  image!: File;
  imagePreview: any = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
  ) {
    super();
    this.registrationForm = this.fb.group({
      'name': fb.control(null, Validators.required),
      'email': fb.control(null, [Validators.required, Validators.email]),
      'password': fb.control(null, Validators.required),
      'role': fb.control(null, Validators.required),
      'how-pass-image': fb.control('download')
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

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result;
    }

    reader.readAsDataURL(file);
  }

  addImageLink(event: any) {
    this.imagePreview = event.target.value;
  }

  onSubmit() {
    this.onShowLoader = true;
    const controls = this.registrationForm.controls;
    if (this.registrationForm.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
      this.onShowLoader = false;
      return;
    }
    this.registrationForm.disable();

    let obs$;
    if (this.registrationForm.get('how-pass-image')?.value === 'download' && this.imagePreview) {
      obs$ = this.authService
        .register({ ...this.registrationForm.value }, this.image);
    } else {
      obs$ = this.authService
        .register({ ...this.registrationForm.value, url: this.imagePreview })
    }
    obs$.pipe(takeUntil(this.destroyStream$))
      .subscribe(
        (data: { user: User }) => {
          this.registrationForm.enable();
          this.onShowLoader = false;
          localStorage.setItem('user', JSON.stringify(data.user));
          this.authService.userActions.next('');
          this.router.navigate(['/']);
          this.alertService.onShowAlert('Registration successfully :)', AlertType.success);
        },
        error => {
          this.registrationForm.enable();
          this.onShowLoader = false;
        }
      )
  }
}
