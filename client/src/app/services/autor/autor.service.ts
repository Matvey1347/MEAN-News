import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutorWithNews } from 'src/app/shared/types/intefaces/autor.interface';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<AutorWithNews> {
    return this.http.get<AutorWithNews>(`/api/autor/${id}`);
  }
}
