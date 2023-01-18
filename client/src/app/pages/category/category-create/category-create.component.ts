import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs';
import { CategoriesService } from 'src/app/services/category/categories.service';
import { DestroySubscription } from 'src/app/shared/helpers/destroy-subscription';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { AlertType } from 'src/app/shared/types/enums/alert.enum';


@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent extends DestroySubscription {
  @ViewChild('input') inputRef!: ElementRef;

  form: FormGroup;
  isShowLoader = false;
  image!: File;
  imagePreview: any = '';
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoryService: CategoriesService,
    private alertService: AlertService,
  ) {
    super();
    this.form = this.fb.group({
      'name': fb.control('', Validators.required)
    })
  }

  onSubmit() {
    this.isShowLoader = true;
    const controls = this.form.controls;
    if (this.form.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
      this.isShowLoader = false;
      return;
    }
    this.form.disable();
    this.categoryService
      .create(this.form.value)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        (data: { message: string }) => {
          this.form.enable();
          this.form.reset();
          this.isShowLoader = false;
          this.alertService.onShowAlert(data.message, AlertType.success);
        },
        error => {
          this.form.enable();
          this.isShowLoader = false;
        }
      )
  }
}
