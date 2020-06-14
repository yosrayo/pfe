import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Favoris } from '../classes/favoris';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class FavorisService {

  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for favoris consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private FavorissUrl = 'http://localhost:8081/favoris';
  constructor(private http: HttpClient) { }
  getFavoriss (): Observable<Favoris[]> {
    return this.http.get<Favoris[]>(this.FavorissUrl).pipe(
      tap(_ => console.log('fetched Favoriss')),
      catchError(this.handleError<Favoris[]>('getFavoriss', []))
    );
  }
  create(favoris: Favoris): Observable<any> {
    return this.http.post<Favoris>(this.FavorissUrl, favoris, httpOptions).pipe(
      tap((newFavoris: Favoris) => console.log(`added favoris w/ id=${newFavoris.id}`)),
      catchError(this.handleError<Favoris>('create'))
    );
  }
  delete(favoris: Favoris | number): Observable<Favoris> {
    const id = typeof favoris === 'number' ? favoris : favoris.id;
    const url = `${this.FavorissUrl}/${id}`;

    return this.http.delete<Favoris>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Favoris id=${id}`)),
      catchError(this.handleError<Favoris>('delete'))
    );
  }
  deleteFavoris(_id: string) {
    return this.http.delete(this.FavorissUrl + `/${_id}`);
  }
}
