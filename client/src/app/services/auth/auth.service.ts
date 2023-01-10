import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Role } from 'src/app/shared/types/enums/role.enum';
import { LoginPost, RegisterPost, User } from '../../shared/types/intefaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userActions = new Subject();

  constructor(private http: HttpClient) { }

  login(data: LoginPost): Observable<{ user: User }> {
    return this.http.post<{ user: User }>('/api/auth/login', data);
  }

  register(data: RegisterPost, image?: File): Observable<{ user: User }> {
    const fd = new FormData();
    fd.append('name', data.name);
    fd.append('email', data.email);
    fd.append('password', data.password);
    fd.append('role', data.role);

    if (image) {
      fd.append('image', image, image.name);
    }

    return this.http.post<{ user: User }>(`/api/auth/registration`, fd);
  }

  logOut() {
    localStorage.clear();
    this.userActions.next('');
  }

  get user() {
    return JSON.parse(localStorage.getItem('user') || '{}') as User;
  }

  get isAuthorized(): boolean {
    return !!this.user._id;
  }

  public isAllowedRole(allowedRoles: Role[]): boolean {
    if (this.isAuthorized) {
      return !!allowedRoles.find(role => role === this.user.role);
    }
    return true;
  }
}
