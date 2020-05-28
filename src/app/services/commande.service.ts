import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Commande } from '../classes/commande';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for commande consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private CommandesUrl = 'http://localhost:8081/commande';
  constructor(private http: HttpClient) { }
  getCommandes (): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.CommandesUrl).pipe(
      tap(_ => console.log('fetched Commandes')),
      catchError(this.handleError<Commande[]>('getCommandes', []))
    );
  }
  create(commande: Commande): Observable<any> {
    return this.http.post<Commande>(this.CommandesUrl, commande, httpOptions).pipe(
      tap((newCommande: Commande) => console.log(`added commande w/ id=${newCommande.id}`)),
      catchError(this.handleError<Commande>('create'))
    );
  }
  delete(commande: Commande | number): Observable<Commande> {
    const id = typeof commande === 'number' ? commande : commande.id;
    const url = `${this.CommandesUrl}/${id}`;

    return this.http.delete<Commande>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Commande id=${id}`)),
      catchError(this.handleError<Commande>('delete'))
    );
  }
}
