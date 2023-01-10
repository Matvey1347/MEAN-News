import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Role } from 'src/app/shared/types/enums/role.enum';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(router: ActivatedRouteSnapshot): boolean {
    const isAllowedRole = !!router.data['allowedRoles'].find((role: Role) => role === this.authService.user.role);
    if (!isAllowedRole) {
      this.router.navigate(['/not-allowed'])
    }
    return isAllowedRole
  };
}