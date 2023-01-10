import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoriesService } from 'src/app/services/category/categories.service';
import { UserService } from 'src/app/services/user/user.service';
import { DestroySubscription } from 'src/app/shared/helpers/destroy-subscription';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { AlertType } from 'src/app/shared/types/enums/alert.enum';
import { User } from 'src/app/shared/types/intefaces/auth.interface';
import { Category } from 'src/app/shared/types/intefaces/categories.intarface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent extends DestroySubscription implements OnInit {
  category$!: Observable<Category>;
  categoryId!: string;
  user!: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private categoryService: CategoriesService,
    private authService: AuthService,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroyStream$))
      .subscribe((params) => {
        this.categoryId = params['id'];
        this.category$ = this.categoryService.getById(this.categoryId);
      });
    
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

  navigateToNews(id: string) {
    this.router.navigate(['news', id])
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
