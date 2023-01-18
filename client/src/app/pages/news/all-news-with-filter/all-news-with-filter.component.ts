import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, takeUntil } from 'rxjs';
import { CategoriesService } from 'src/app/services/category/categories.service';
import { NewsService } from 'src/app/services/news/news.service';
import { DestroySubscription } from 'src/app/shared/helpers/destroy-subscription';
import { CategoryName } from 'src/app/shared/types/intefaces/categories.intarface';
import { News } from "src/app/shared/types/intefaces/news.interface"

@Component({
  selector: 'app-all-news-with-filter',
  templateUrl: './all-news-with-filter.component.html',
  styleUrls: ['./all-news-with-filter.component.scss']
})
export class AllNewsWithFilterComponent extends DestroySubscription implements OnInit {
  form: FormGroup;
  categoriesName$!: Observable<CategoryName[]>;
  allNews: News[] = [];
  isShowLoader = true;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private newsService: NewsService
  ) {
    super();
    this.form = this.fb.group({
      'title': fb.control(null),
      'category': fb.control(null),
    })
  }

  ngOnInit(): void {
    this.categoriesName$ = this.categoriesService.getNames();
    this.newsService.getAll()
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        (news) => {
          this.allNews = news;
          this.isShowLoader = false;
        }
      )
  }

}
