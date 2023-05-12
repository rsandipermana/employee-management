import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const authToken = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user');
    if (authToken && user) {
      return true; // allow access to the route
    } else {
      this.router.navigate(['/login']); // redirect to login page
      return false; // block access to the route
    }
  }

}
