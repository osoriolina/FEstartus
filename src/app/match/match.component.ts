import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent {

  data: any;
  subscription: Subscription;
  isLogged = false;
  // OBJ que se recibe con la info GET de las companies
  profileData: object;

  // IBJ que se envia con la info de los filtros 
  filtersData = {
    industry: '',
    companySize: '',
    companyType: '',
  };

  constructor(
    public _data: DataService,
    public _http: HttpClient,
    public _router: ActivatedRoute
  ) {

    this.subscription = this._data.profile.subscribe(
      (objProfile) => {
      this.profileData = objProfile;

      });
  }

  sendFiltersForm(form: NgForm): void {
    this._data.sendFilters(this.filtersData);
    console.log(this.filtersData);
  }

  logOut() {
    this.isLogged = false;
  }

  ngOnInit() {
    this._data.companiesGET();

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
