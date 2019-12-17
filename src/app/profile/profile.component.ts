import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  // MY PROFILE - The profile of the user

  id: number;
  subscription: Subscription;
  profileData: object;

  constructor(
    public _data: DataService,
    public _http: HttpClient,
    public _router: ActivatedRoute
  ) { 
    this.subscription = this._data.profile.subscribe(
      (objProfile) => { this.profileData = objProfile; });

  }

  ngOnInit() {
    this._data.myCompanyGET();
  }

}
