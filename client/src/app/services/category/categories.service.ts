import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, CategoryName } from '../../shared/types/intefaces/categories.intarface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  ALL_CATEGORIES_NAME = 0;

  constructor(private http: HttpClient) { }

  getNames(limit: number = this.ALL_CATEGORIES_NAME): Observable<CategoryName[]> {
    return this.http.get<CategoryName[]>('/api/category/name', { params: { limit } });
  }

  getAll(user_id?: string): Observable<Category[]> {
    return this.http.get<Category[]>((user_id) ? `/api/category/user/${user_id}` : `/api/category`);
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/category/${id}`);
  }

  create(name: string): Observable<{message: string}> {
    return this.http.post<{message: string}>(`/api/category`, name);
  }
}
