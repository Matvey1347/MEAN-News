import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, takeUntil } from 'rxjs';
import { CategoriesService } from 'src/app/services/category/categories.service';
import { DestroySubscription } from 'src/app/shared/helpers/destroy-subscription';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { CategoryName } from 'src/app/shared/types/intefaces/categories.intarface';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.scss']
})
export class NewsCreateComponent extends DestroySubscription implements OnInit {

  @ViewChild('input') inputRef!: ElementRef;

  form: FormGroup;
  categoriesName$!: Observable<CategoryName[]>
  onShowLoader = false;
  image!: File;
  imagePreview: any = '';
  showPassword = false;
  isError = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private categoriesService: CategoriesService
  ) {
    super();
    this.form = this.fb.group({
      'title': fb.control(null, Validators.required),
      'category': fb.control(null, Validators.required),
      'list': fb.array([this.addListControls()], Validators.required),
      'role': fb.control(null, Validators.required),
    })
  }

  ngOnInit(): void {
    this.categoriesName$ = this.categoriesService.getNames();
  }

  private addListControls() {
    const fb = this.fb;
    return  fb.control('', Validators.required);
  }

  get listControls() {
    return this.form.get('list') as FormArray;
  }

  addList() {
    this.listControls.push(this.addListControls());
  }

  deleteList(id: number) {
    this.listControls.removeAt(id);
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

  onSubmit() {
    this.onShowLoader = true;
    const list = this.form.get('list') as FormArray;
    const listControls = list.controls;
    const controls = this.form.controls;
    if (this.form.invalid) {
      Object.keys(controls).forEach((controlName) => {
        controls[controlName].markAsTouched();
      });
      Object.keys(listControls).forEach((listControlName, i) => {
        listControls[i].markAsTouched();
      });
      this.onShowLoader = false;
      this.isError = !!this.form.get('category')?.invalid;
      return;
    }
    this.form.disable();
    // this.authService
    //   .register(this.form.value, this.image)
    //   .pipe(takeUntil(this.destroyStream$))
    //   .subscribe(
    //     (data: { user: User }) => {
    //       this.form.enable();
    //       this.onShowLoader = false;
    //       localStorage.setItem('user', JSON.stringify(data.user));
    //       this.authService.userActions.next('');
    //       this.router.navigate(['/']);
    //       this.alertService.onShowAlert('Registration successfully :)', AlertType.success);
    //     },
    //     error => {
    //       this.form.enable();
    //       this.onShowLoader = false;
    //     }
    //   )
  }
}
