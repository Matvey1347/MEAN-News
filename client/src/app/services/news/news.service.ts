import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateComment, News, NewsCreatePost } from 'src/app/shared/types/intefaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<News[]> {
    return this.http.get<News[]>('/api/news');
  }

  getById(id: string): Observable<News> {
    return this.http.get<News>(`/api/news/${id}`);
  }

  create(data: NewsCreatePost, image?: File): Observable<News> {
    if (image) {
      const fd = new FormData();
      fd.append('title', data.title);
      fd.append('autor', data.autor);
      fd.append('category', data.category);
      fd.append('list', JSON.stringify(data.list));
      fd.append('image', image, image.name);
      
      return this.http.post<News>(`/api/news`, fd);
    } else {
      return this.http.post<News>(`/api/news`, {...data});
    }
  }

  createComment(id: string, comment: CreateComment): Observable<News> {
    return this.http.patch<News>(`/api/news/${id}`, comment);
  }
}
