import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoriesService } from 'src/app/services/category/categories.service';
import { NewsService } from 'src/app/services/news/news.service';
import { DestroySubscription } from 'src/app/shared/helpers/destroy-subscription';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { AlertType } from 'src/app/shared/types/enums/alert.enum';
import { CategoryName } from 'src/app/shared/types/intefaces/categories.intarface';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.scss']
})
export class NewsCreateComponent extends DestroySubscription implements OnInit {

  @ViewChild('input') inputRef!: ElementRef;

  form: FormGroup;
  categoriesName$!: Observable<CategoryName[]>;
  isShowLoader = false;
  image!: File;
  imagePreview: any = '';
  showPassword = false;
  isError = false;
  firstCategoryId: string = "";

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private newsService: NewsService,
    private router: Router
  ) {
    super();
    this.form = this.fb.group({
      'title': fb.control(null, Validators.required),
      'category': fb.control(null, Validators.required),
      'list': fb.array([this.addListControls()], Validators.required),
      'how-pass-image': fb.control('download')
    });
  }

  ngOnInit(): void {
    this.categoriesName$ = this.categoriesService.getNames();

    this.categoriesName$.subscribe(categories => {
      if (categories && categories.length > 0) {
        this.firstCategoryId = categories[0]._id;
        this.form.get('category')?.setValue(this.firstCategoryId);
      }
    });
  }

  private addListControls() {
    const fb = this.fb;
    return fb.control('', Validators.required);
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

  addImageLink(event: any) {
    this.imagePreview = event.target.value;
  }

  onSubmit() {
    this.isShowLoader = true;
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
      this.isShowLoader = false;
      this.isError = !!this.form.get('category')?.invalid;
      return;
    }

    let obs$;
    if (this.form.get('how-pass-image')?.value === 'download' && this.imagePreview) {
      obs$ = this.newsService
        .create({ ...this.form.value, autor: this.authService.user._id }, this.image);
    } else {
      obs$ = this.newsService
        .create({ ...this.form.value, url: this.imagePreview, autor: this.authService.user._id })
    }
    obs$.pipe(takeUntil(this.destroyStream$))
      .subscribe(
        (data) => {
          this.isShowLoader = false;
          this.alertService.onShowAlert('News was successfully created :)', AlertType.success);
          this.form.reset();
          this.form.get('category')?.setValue(this.firstCategoryId);
          this.form.get('how-pass-image')?.setValue('download');
          this.imagePreview = '';
          this.isError = false;
          this.router.navigate(['/news']);
        },
        error => {
          console.log("error", error);
          this.isShowLoader = false;
        }
      )
  }
}
