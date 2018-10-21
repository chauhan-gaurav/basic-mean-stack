import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from 'src/app/auth/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '/user/';

@Injectable({ providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;
  private userId: string;
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  createUser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password };
    return this.http.post(BACKEND_URL + '/signup', authData)
    .subscribe(response => {
     this.router.navigate(['/']);
    }, error => {
      this.authStatusListener.next(false);
    }
  );
  }

  login(email: string, password: string) {
    const authData: AuthData = {email: email, password: password };
    this.http.post<{token: string, expiresIn: number, userId: string}>(BACKEND_URL + '/login', authData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {
        const expiresInDuration = response.expiresIn;
        console.log(expiresInDuration);
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.userId = response.userId;
        const now = new Date();
        const expiration = new Date(now.getTime() + expiresInDuration * 1000);
        console.log(expiration);
        this.saveAuthData(token, expiration, this.userId);
        this.authStatusListener.next(true);
        this.router.navigate(['/']);
      }
    }, error => {
      this.authStatusListener.next(false);
    });
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getToken() {
    return this.token;
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expiration.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  getUserId() {
    return this.userId;
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expiration) {
      return;
    }
    return {
      token: token,
      expiration: new Date(expiration),
      userId: userId
    };
  }

  private setAuthTimer(expiresInDuration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    },
      expiresInDuration * 1000);
  }
}


