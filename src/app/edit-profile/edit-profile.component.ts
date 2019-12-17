import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  id: number;
  subscription: Subscription;
  
  data: object;
  
  step: number = 1;


  profileData: object = {
    languagesRaw: {},
    languages: [],

  };

  constructor(
    public _data: DataService,
    public _http: HttpClient,
    public _router: Router,
    public _activatedRoute: ActivatedRoute
  ) {
    this.id = this._activatedRoute.snapshot.params.id;

    this.subscription = this._data.profile.subscribe(
      (objProfile) => {
        console.log(objProfile);
        this.data = objProfile;
        console.log(this.data);
      });

  }

  nextStep() {
    this.step++;
  }

  previousStep() {
    this.step--;
  }

  sendUpdatedProfile(form: FormControl): void {

    if (form.valid) {

      let arrayOfValidLanguages = [];

      for (let language in this.profileData['languagesRaw']) {

        if (this.profileData['languagesRaw'][language] === true) {
          arrayOfValidLanguages.push(language);

        }
      }
      this.profileData['languages'] = arrayOfValidLanguages
    }


    delete this.profileData['languagesRaw'];
    this._data.sendProfile(this.profileData);
    // deberia ir al perfil del usuario
    this._router.navigateByUrl('/myprofile');
  }

}
