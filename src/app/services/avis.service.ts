import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Avis } from '../classes/avis';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AvisService {

 
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for avis consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private AvissUrl = 'http://localhost:8081/avis';
  constructor(private http: HttpClient) { }
  getAviss (): Observable<Avis[]> {
    return this.http.get<Avis[]>(this.AvissUrl).pipe(
      tap(_ => console.log('fetched Aviss')),
      catchError(this.handleError<Avis[]>('getAviss', []))
    );
  }
  create(avis: Avis): Observable<any> {
    return this.http.post<Avis>(this.AvissUrl, avis, httpOptions).pipe(
      tap((newAvis: Avis) => console.log(`added avis w/ id=${newAvis.id}`)),
      catchError(this.handleError<Avis>('create'))
    );
  }
  delete(avis: Avis | number): Observable<Avis> {
    const id = typeof avis === 'number' ? avis : avis.id;
    const url = `${this.AvissUrl}/${id}`;

    return this.http.delete<Avis>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Avis id=${id}`)),
      catchError(this.handleError<Avis>('delete'))
    );
  }
}
