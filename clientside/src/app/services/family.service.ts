import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  url: string;

// tslint:disable-next-line:no-unused-expression
getallfamily (): Observable<object> {
  this.url = 'http://localhost:3000/family';
return this._http.get(this.url);
}

// add family
addfamily(family: object): Observable<object> {
  console.log(family);
  return this._http.post(this.url, family);
}

// delete family
deletefamily(family): Observable<object> {
  this.url = family;
  return this._http.delete( this.url, family);

}

editfamily(family: object):  Observable<object> {
  console.log(family);
  this.url = family['url'];
return this._http.patch(this.url, family);
}


  constructor(private _http: HttpClient) {
    this.url = 'http://localhost:3000/family';
  }
}
