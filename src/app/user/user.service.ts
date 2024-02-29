import { Injectable } from '@angular/core';
import { AuthData } from '../auth/auth-data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  APIurl = environment.APIurl;
  private currentUser: User | null = null;

  constructor(private http: HttpClient) {}

  setcurrentUser(user: any) {
    this.currentUser = user;
  }

  setCurrentUser(user: any) {
    return this.currentUser;
  }

  getCurrentUser(): any | null {
    return this.currentUser;
  }

  getUserFromLocalStorage(): any | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.APIurl}/users/${id}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.APIurl}/users`);
  }

  delUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.APIurl}/users/${id}`);
  }
}
