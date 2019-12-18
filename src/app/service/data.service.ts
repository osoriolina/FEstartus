import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'https://startus.es/';
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
        (result) => { 
          console.log(result); 
          this.data = (result);
          this.profile.next(result)
        }
      );
  }

  // GET profile company by ID - for all the companies (individual) (PUBLIC)
  profileGET(id) {
    let url = 'https://startus.es/companies/' + id;
    this._http.get
      (url,
        { headers: new HttpHeaders({ 'x-requested-with': 'XMLHttpResponse' }) }
      )
      .subscribe(
        (result: any) => { this.profile.next(result); }
      );
  }

  // GET to get the info of ALL companies for the MATCH(connect) table
  companiesGET() {
    let url = 'https://startus.es/companies';
    this._http.get
      (url,
        { headers: new HttpHeaders({ 'x-requested-with': 'XMLHttpResponse' }) }
      )
      .subscribe(
        (result: any) => { this.profile.next(result); }
      );
  }

  // GET to get the info of MY company (PRIVATE)
  myCompanyGET() {
    let url = 'https://startus.es/mycompany';
    this._http.get
      (url,
        { headers: new HttpHeaders({ 'x-requested-with': 'XMLHttpResponse' }) }
      )
      .subscribe(
        (result: any) => { this.profile.next(result); }
      );
  }

  // POST - subscribe company
  sendProfile(profileData) {
    this.profilePOST(this.url + 'company/profile', profileData);
  }

  // POST /companies BE endpoint
  sendFilters(profileData) {
    this.profilePOST(this.url + 'companies', profileData);
  }

}
