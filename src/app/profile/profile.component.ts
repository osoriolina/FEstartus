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

  id: number;
  subscription: Subscription;
  profileData: object;

  constructor(
    public _data: DataService,
    public _http: HttpClient,
    public _router: ActivatedRoute
  ) { 
    this.id = this._router.snapshot.params.id;
    this._data.profileGET(this.id);

    this.subscription = this._data.profile.subscribe(
      (objProfile) => {
        console.log(objProfile);
        this.profileData = objProfile;
        console.log(this.profileData)
      });
  }

}
