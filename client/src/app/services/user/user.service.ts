import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  subscribeToCategory(category_id: string, user_id: string) {
    return this.http.patch<{ message: string }>(`/api/user/${user_id}`, { category_id });
  }
}
