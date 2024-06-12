import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from './auth-response';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User|null>(null);

  constructor(private httpClient: HttpClient, private router: Router) { }

  signup(email: string, password: string): Observable<AuthResponse>{
   return this.httpClient.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDCe1_cmi9CFUCBzOByW68jYukBnGLH5nA',{
         email: email,
         password: password,
         returnSecureToken: true
    })
    .pipe(catchError(this.handleError), 
          tap(res => {this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn);
                     }))
  }

  signin(email: string, password: string): Observable<AuthResponse> {
     return this.httpClient.post<AuthResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDCe1_cmi9CFUCBzOByW68jYukBnGLH5nA', {
          email: email,
          password: password,
          returnSecureToken: true
     })
     .pipe(tap((res) => this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn)),
           catchError(this.handleError))
  }

  signOut(){
    this.user.next(null);
    this.router.navigate(['auth']);
  }

  private handleAuthentication(username: string, id: string, tokenId: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    let userData = new User(username, id, tokenId, expirationDate);
    this.user.next(userData);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already';
          break;
      case 'INVALID_LOGIN_CREDENTIALS':
          errorMessage = 'Email or Password is not correct.';
          break;
  }
    return throwError(errorMessage);
}
}
