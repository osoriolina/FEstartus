import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-single-profile',
  templateUrl: './public-single-profile.component.html',
  styleUrls: ['./public-single-profile.component.css']
})
export class PublicSingleProfileComponent {
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
        console.log(this.profileData);
      });
  }
}
