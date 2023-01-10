import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from 'src/app/shared/types/intefaces/feedback.interface';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  create(data: Feedback): Observable<{ message: string }> {
    return this.http.post<{ message: string }>('/api/feedback', data);
  }

  getAll(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>('/api/feedback');
  }
}
