import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: Http) {}

  registerUser(user:any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/account/reg', user, {
      headers: headers,
    }).pipe(map(res=>res.json()))
  }
}
