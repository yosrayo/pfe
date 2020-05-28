import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Categorie } from '../classes/categorie';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for categorie consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private CategoriesUrl = 'http://localhost:8081/categorie';
  constructor(private http: HttpClient) { }
  getCategories (): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.CategoriesUrl).pipe(
      tap(_ => console.log('fetched Categories')),
      catchError(this.handleError<Categorie[]>('getCategories', []))
    );
  }
  create(categorie: Categorie): Observable<any> {
    return this.http.post<Categorie>(this.CategoriesUrl, categorie, httpOptions).pipe(
      tap((newCategorie: Categorie) => console.log(`added categorie w/ id=${newCategorie.id}`)),
      catchError(this.handleError<Categorie>('create'))
    );
  }
  delete(categorie: Categorie | number): Observable<Categorie> {
    const id = typeof categorie === 'number' ? categorie : categorie.id;
    const url = `${this.CategoriesUrl}/${id}`;

    return this.http.delete<Categorie>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Categorie id=${id}`)),
      catchError(this.handleError<Categorie>('delete'))
    );
  }
}
