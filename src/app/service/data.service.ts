import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'http://localhost:3000/';
  data: object;
  profile: Subject<object> = new Subject<object>();

  constructor(
    public _http: HttpClient
  ) { }


  profilePOST(url: string, obj: object) {
    this._http.post(url,
      obj,
      { headers: new HttpHeaders({ 'x-requested-with': 'XMLHttpResponse' }) }
    )
      .subscribe(
        (result) => { console.log(result); this.data = (result) }
      );
  }

  profileGET(id) {
    let url = 'http://localhost:3000/companies/' + id;
    this._http.get
      (url,
        { headers: new HttpHeaders({ 'x-requested-with': 'XMLHttpResponse' }) }
      )
      .subscribe(
        (result: any) => { console.log(result); this.profile.next(result); }
      )
  }

  companiesGET() {
    let url = 'http://localhost:3000/companies';
    this._http.get
      (url,
        { headers: new HttpHeaders({ 'x-requested-with': 'XMLHttpResponse' }) }
      )
      .subscribe(
        (result: any) => { console.log(result); this.profile.next(result); }
      )

  }


  sendProfile(profileData) {
    this.profilePOST(this.url + 'company/profile', profileData)
  }

  sendFilters(profileData) {
    this.profilePOST(this.url + 'companies', profileData)
  }

}
