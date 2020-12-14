import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Animal } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) readonly platformId: Object) { }

  getAll() {
    return this.http.get('/assets/data/animals.json');
  }

  search(q: string): Observable<Animal[]> {
    if (!q || q === '*') {
      q = '';
    } else {
      q = q.toLowerCase();
    }
    return this.getAll().pipe(
      map((data: Animal[]) =>
        data
          .filter(item => JSON.stringify(item).toLowerCase().includes(q))
      ));
  }

  get(id: number) {
    return this.getAll().pipe(
      map((all: any) => all.find(e => e.id === id)));
  }
}
