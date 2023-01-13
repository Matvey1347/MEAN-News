import { Component } from '@angular/core';
import { takeUntil } from 'rxjs';
import { DestroySubscription } from '../../helpers/destroy-subscription';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../types/intefaces/auth.interface';
import { Role } from '../../types/enums/role.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends DestroySubscription {
  user!: User;
  Role = Role;
  UserAndAutor = [Role.User, Role.Autor];
  Admin = [Role.Admin];
  Autor = [Role.Autor];

  constructor(
    public authService: AuthService,
  ) {
    super();
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

  logOut() {
    this.authService.logOut();
  }
}