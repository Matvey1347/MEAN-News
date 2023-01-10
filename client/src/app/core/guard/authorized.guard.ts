import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Role } from 'src/app/shared/types/enums/role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(router: ActivatedRouteSnapshot): boolean {
    const isAuthorized = this.authService.isAuthorized;
    if (!isAuthorized) {
      this.router.navigate(['/authorized']);
    }
    return isAuthorized
  };
}