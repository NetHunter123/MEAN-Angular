import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { map } from 'rxjs/operators';
import { postcss } from '@angular-devkit/build-angular/src/webpack/plugins/postcss-cli-resources';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: any;
  user: any;
  constructor(private http: Http) {}

  registerUser(user: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post('http://localhost:3000/account/reg', user, {
        headers: headers,
      })
      .pipe(map((res) => res.json()));
  }

  authUser(user: object) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post('http://localhost:3000/account/auth', user, {
        headers: headers,
      })
      .pipe(map((res) => res.json()));
  }

  storeUser(token: string, user: object) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

  isAuthenticated() {
    // return tokenNotExpired()
    // return this.jwtHelper.isTokenExpired(this.token); angular-jwt
    if (this.token) {
      return true;
    } else {
      return false;
    }
  }

  createPost(post: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post('http://localhost:3000/account/dashboard', post, {
        headers: headers,
      })
      .pipe(map((res) => res.json()));
  }

  getAllPosts() {
    return this.http
      .get('http://localhost:3000')
      .pipe(map((res) => res.json()));
  }
  getPostById(id:any) {
    return this.http
      .get(`http://localhost:3000/post/${id}`)
      .pipe(map((res) => res.json()));
  }

  deletePost(id:any){
    return this.http
      .delete(`http://localhost:3000/post/${id}`)
      .pipe(map((res) => res.json()));
  }
}
