import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(_: any, state: RouterStateSnapshot): boolean {
    const isAuthorized = this.authService.isAuthorized;
    if(isAuthorized) {
      this.router.navigate(['/'])
    }
    return !isAuthorized
  };
}