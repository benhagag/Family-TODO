import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url: string;

  constructor(private _http: HttpClient) {
    this.url = 'http://localhost:3000/todo';
  }


  // tslint:disable-next-line:no-unused-expression
  getalltodo(): Observable<object> {
    this.url = 'http://localhost:3000/todo';
    return this._http.get(this.url);
  }

  addfamily(todo: object): Observable<object> {
    console.log(todo);
    return this._http.post(this.url, todo);
  }

  deletetodo(todo): Observable<object> {
    this.url = todo;
    return this._http.delete(this.url, todo);
  }

  getoneotodo(todo): Observable<object> {
    this.url = todo;
    return this._http.get(this.url);
  }
}


