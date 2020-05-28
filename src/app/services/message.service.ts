import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Message } from '../classes/message';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class MessageService {

 
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for message consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private MessagesUrl = 'http://localhost:8081/message';
  constructor(private http: HttpClient) { }
  getMessages (): Observable<Message[]> {
    return this.http.get<Message[]>(this.MessagesUrl).pipe(
      tap(_ => console.log('fetched Messages')),
      catchError(this.handleError<Message[]>('getMessages', []))
    );
  }
  create(message: Message): Observable<any> {
    return this.http.post<Message>(this.MessagesUrl, message, httpOptions).pipe(
      tap((newMessage: Message) => console.log(`added message w/ id=${newMessage.id}`)),
      catchError(this.handleError<Message>('create'))
    );
  }
  delete(message: Message | number): Observable<Message> {
    const id = typeof message === 'number' ? message : message.id;
    const url = `${this.MessagesUrl}/${id}`;

    return this.http.delete<Message>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Message id=${id}`)),
      catchError(this.handleError<Message>('delete'))
    );
  }
}
