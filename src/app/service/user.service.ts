import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLogged = false;
  url = 'http://localhost:3000/';
  formData: Subject<object> = new Subject<object>();
  loggedUser: string = '';

    constructor(
      public _http: HttpClient
    ) { }

httpPOST(url: string, obj: object) {
  this._http.post(url,
    obj,
    { headers: new HttpHeaders({ 'x-requested-with': 'XMLHttpResponse' }) }
  )
    .subscribe(
      (result) => {
        //setear una variable en el localstorage e.g. logged true
        localStorage.setItem('token', 'loggedTrue');
        this.formData.next(result);

      }
    );
}

register(email, password) {
  this.httpPOST(this.url + 'register', { 'email': email, 'password': password });
}

login(email, password) {
  this.loggedUser = email;
  this.httpPOST(this.url + 'login', { 'email': email, 'password': password });
}

logOut() {
  this.isLogged = false;
}
}
