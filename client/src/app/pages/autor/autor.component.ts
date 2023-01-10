import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, takeUntil } from 'rxjs';
import { AutorService } from 'src/app/services/autor/autor.service';
import { DestroySubscription } from 'src/app/shared/helpers/destroy-subscription';
import { AutorWithNews } from 'src/app/shared/types/intefaces/autor.interface';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.scss']
})
export class AutorComponent extends DestroySubscription implements OnInit {
  currentId!: number;
  autor$!: Observable<AutorWithNews>;

  constructor(
    private autorService: AutorService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super();
  }

  navigateToNews(id: string) {
    this.router.navigate(['news', id])
  }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        (params) => {
          this.currentId = params['id'];
          this.autor$ = this.autorService.getById(this.currentId);
        }
      );
    
  }

}
