import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent {

  subscription: Subscription;
  profileData: object;

  filtersData: object;

  constructor(
    public _data: DataService,
    public _http: HttpClient,
    public _router: ActivatedRoute
  ) {

    this.subscription = this._data.profile.subscribe(
      (objProfile) => { this.profileData = objProfile; });
  }

  sendFiltersForm(form: FormControl): void {
  this._data.sendFilters(this.filtersData);
  console.log(this.filtersData);
  } 

  ngOnInit() {
    this._data.companiesGET();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
