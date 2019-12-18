import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(public _router: Router) {}

  canActivate() {

    if(localStorage.getItem('token') === 'loggedTrue') {
      return true
    } else {
      this._router.navigateByUrl('/login');
    }
  }
}
