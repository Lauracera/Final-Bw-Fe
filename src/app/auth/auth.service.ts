import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, throwError, tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  checkEmail() {
    throw new Error('Method not implemented.');
  }
  jwtHelper = new JwtHelperService();
  APIurl = environment.APIurl;
  private authSubj = new BehaviorSubject<null | AuthData>(null);
  user!: AuthData;
  user$ = this.authSubj.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { email: string; password: string }) {
    return this.http.post<AuthData>(`${this.APIurl}login`, data).pipe(
      tap((loggato) => {
        console.log(loggato);
        this.authSubj.next(loggato);
        this.user = loggato;
        console.log(this.user);
        localStorage.setItem('user', JSON.stringify(loggato));
      }),
      catchError(this.errors)
    );
  }

  restore() {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }
    const userData: AuthData = JSON.parse(user);
    if (this.jwtHelper.isTokenExpired(userData.accessToken)) {
      return;
    }
    this.authSubj.next(userData);
  }

  register(data: {
    nome: string;
    cognome: string;
    email: string;
    password: string;
  }) {
    return this.http.post(`${this.APIurl}/register`, data);
  }

  logout() {
    this.authSubj.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  private errors(err: any) {
    switch (err.error) {
      case 'Email already exists':
        return throwError('Email già registrata');
        break;

      case 'Email  format is invalid':
        return throwError('Formato mail non valido');
        break;

      default:
        return throwError('Errore nella chiamata');
        break;
    }
  }

  getUserId(): number | null {
    const authData = this.authSubj.value;

    if (authData && authData.user && authData.user.id) {
      return authData.user.id;
    }

    return null;
  }
}
