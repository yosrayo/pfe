import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Produit } from '../classes/produit';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class ProduitService {

  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for produit consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private ProduitsUrl = 'http://localhost:8081/produit';
  constructor(private http: HttpClient) { }
  getProduits (): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.ProduitsUrl).pipe(
      tap(_ => console.log('fetched Produits')),
      catchError(this.handleError<Produit[]>('getProduits', []))
    );
  }
  create(produit: Produit): Observable<any> {
    return this.http.post<Produit>(this.ProduitsUrl, produit, httpOptions).pipe(
      tap((newProduit: Produit) => console.log(`added produit w/ id=${newProduit.id}`)),
      catchError(this.handleError<Produit>('create'))
    );
  }
  delete(produit: Produit | number): Observable<Produit> {
    const id = typeof produit === 'number' ? produit : produit.id;
    const url = `${this.ProduitsUrl}/${id}`;

    return this.http.delete<Produit>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Produit id=${id}`)),
      catchError(this.handleError<Produit>('delete'))
    );
  }
}
