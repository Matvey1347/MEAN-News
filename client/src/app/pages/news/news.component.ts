import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NewsService } from 'src/app/services/news/news.service';
import { UserService } from 'src/app/services/user/user.service';
import { DestroySubscription } from 'src/app/shared/helpers/destroy-subscription';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { AlertType } from 'src/app/shared/types/enums/alert.enum';
import { User } from 'src/app/shared/types/intefaces/auth.interface';
import { Category } from 'src/app/shared/types/intefaces/categories.intarface';
import { News } from 'src/app/shared/types/intefaces/news.interface';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent extends DestroySubscription implements OnInit {
  news!: News;
  newsId!: string;
  isShowLoaderBigLoader = false;
  isShowLoaderForComments = false;
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertService: AlertService,
    private newsService: NewsService,
    private userService: UserService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        (params) => {
          this.isShowLoaderBigLoader = true;
          this.newsId = params['id'];
          this.newsService
            .getById(params['id'])
            .pipe(takeUntil(this.destroyStream$))
            .subscribe(
              (news) => {
                this.news = news;
                this.isShowLoaderBigLoader = false;
              }
            )
        }
      )
    this.user = this.authService.user;
    this.authService
      .userActions
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        () => {
          this.user = this.authService.user;
        }
      )
  }

  addComment(inputComment: HTMLInputElement, event?: any) {
    if (!event || event.key === "Enter") {
      if (inputComment.value) {
        this.isShowLoaderForComments = true;
        const comment = {
          message: inputComment.value,
          autor: this.authService.user._id
        }
        this.newsService
          .createComment(this.newsId, comment)
          .pipe(takeUntil(this.destroyStream$))
          .subscribe(
            (news) => {
              inputComment.value = '';
              this.isShowLoaderForComments = false;
              this.news.comments.push(news.comments[news.comments.length - 1]);
              this.alertService.onShowAlert('Your message has been successfully added :)', AlertType.success);
            },
            error => {
              this.isShowLoaderForComments = false;
            }
          )
      } else {
        this.alertService.onShowAlert('Please write your message!', AlertType.warning)
      }
    }
  }

  subscibeToThisCategory(category: Category) {
    this.userService
      .subscribeToCategory(category._id, this.user._id)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        (data: { message: string }) => {
          this.alertService.onShowAlert(data.message, AlertType.success);
          category.subscribe = true;
          this.user.subscriptions.push(category._id);
          localStorage.setItem('user', JSON.stringify(this.user));
        },
        error => {
          this.alertService.onShowAlert(error.error.message, AlertType.warning);
        }
      )
  }

  hasSubscription(categoryId: string) {
    return !!this.user.subscriptions.find(category_id => category_id === categoryId);
  }
}
