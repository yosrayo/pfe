import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Panier } from '../classes/panier';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class PanierService {

  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for panier consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private PaniersUrl = 'http://localhost:8081/panier';
  constructor(private http: HttpClient) { }
  getPaniers (): Observable<Panier[]> {
    return this.http.get<Panier[]>(this.PaniersUrl).pipe(
      tap(_ => console.log('fetched Paniers')),
      catchError(this.handleError<Panier[]>('getPaniers', []))
    );
  }
  create(panier: Panier) {
    return this.http.post<any>('http://localhost:8081/panier', panier);
  }
  delete(panier: Panier | number): Observable<Panier> {
    const id = typeof panier === 'number' ? panier : panier.id;
    const url = `${this.PaniersUrl}/${id}`;

    return this.http.delete<Panier>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Panier id=${id}`)),
      catchError(this.handleError<Panier>('delete'))
    );
  }

  deletePanier(_id: string) {
    return this.http.delete(this.PaniersUrl + `/${_id}`);
  }
  updatepanier(emp) {
    return this.http.put(this.PaniersUrl + `/${emp.id}`, emp);
  }

}
