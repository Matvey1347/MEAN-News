import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, Observable, takeUntil } from 'rxjs';
import { CategoriesService } from 'src/app/services/category/categories.service';
import { NewsService } from 'src/app/services/news/news.service';
import { DestroySubscription } from 'src/app/shared/helpers/destroy-subscription';
import { Category, CategoryName } from 'src/app/shared/types/intefaces/categories.intarface';
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
  news: News[] = [];
  isShowLoader = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private categoriesService: CategoriesService,
    private newsService: NewsService
  ) {
    super();
    this.form = this.fb.group({
      'title': fb.control(null),
      'category': fb.control(null),
    })
  }

  navigateToNews(id: string) {
    this.router.navigate(['news', id])
  }

  ngOnInit(): void {
    this.categoriesName$ = this.categoriesService.getNames();
    this.newsService.getAll()
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        (news) => {
          this.allNews = news;
          this.news = this.allNews;
          this.isShowLoader = false;
        }
      );
        
    this.form.get('title')
      ?.valueChanges
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        (value: string) => {
          if(value) this.filterByTitle(value.toLowerCase());
        }
      );
    
    this.form.get('category')
      ?.valueChanges
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        (_id: string) => {
          if(_id) this.getCategoryNews(_id);
        }
      )
  }

  filterByTitle(value: string,) {
    if (!this.form.value.category) {
      this.news = this.allNews.filter((news) => news.title.toLowerCase().includes(value));
    } else {
      this.news = this.news.filter((news) => news.title.toLowerCase().includes(value));
    }
  }

  getCategoryNews(_id: string) {
    this.isShowLoader = true;
    this.categoriesService
      .getById(_id)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        (category: Category) => {
          this.news = category.news;
          if (this.form.value.title) this.filterByTitle(this.form.value.title);
          this.isShowLoader = false;
        }
      )
  }

  showAll() {
    this.news = this.allNews;
    this.form.reset();
  }
}
