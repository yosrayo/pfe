import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../classes/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class UserService {

  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private UsersUrl = 'http://localhost:8081/user';
  constructor(private http: HttpClient) { }
  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.UsersUrl).pipe(
      tap(_ => console.log('fetched Users')),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }
  create(user: User): Observable<any> {
    return this.http.post<User>(this.UsersUrl, user, httpOptions).pipe(
      tap((newUser: User) => console.log(`added user w/ id=${newUser.id}`)),
      catchError(this.handleError<User>('create'))
    );
  }
  update(user: User | number): Observable<User> {
    return this.http.put<User>(this.UsersUrl, user, httpOptions).pipe(
      tap((newUser: User) => console.log(`updeted user w/ id=${newUser.id}`)),
      catchError(this.handleError<User>('create'))
    );
  }

  delete(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.UsersUrl}/${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted User id=${id}`)),
      catchError(this.handleError<User>('delete'))
    );
  }

  updateUser(emp) {
    return this.http.put(this.UsersUrl + `/${emp.id}`, emp);
  }
  getuserbyId(id:number){
    return this.http.get(this.UsersUrl +'/'+id)
  }
}
