import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/RegisterUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '../models/Token';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

const Api_Url = 'https://localhost:44398';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo = new Subject<{}>();

  constructor(private _http: HttpClient, private _router: Router) { }

  register(registerUserData: RegisterUser) {
    return this._http.post(`${Api_Url}/api/Account/Register`, registerUserData);
  }

  login(loginInfo) {
    const str = 
      `grant_type=password&username=${encodeURI(loginInfo.email)}&password=${encodeURI(loginInfo.password)}`;

    return this._http.post(`${Api_Url}/token`, str).subscribe((token: Token) => {
      localStorage.setItem('id_token', token.access_token);
      //example of token logged to console
      console.log(token);
      this.userInfo.next({
        isLoggedIn: true,
        user: token.username
      });
      this._router.navigate(['/notes']);
    });
  }

  currentUser(): Observable<Object> {
    if(!localStorage.getItem('id_token')) {
      return new Observable(observer => observer.next(false));
    }

    return this._http.get(`${Api_Url}/api/Account/UserInfo`, { headers: this.setHeader() });
  }

  logout() {
    localStorage.clear();
    this.userInfo.next(false);

    this._http.post(`${Api_Url}/api/Account/Logout`, { headers: this.setHeader() });
    this._router.navigate(['/login']);
  }

  private setHeader(): HttpHeaders {
    return new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('id_token')}`);
  }
}
