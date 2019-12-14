import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  step: number = 1;

  profileData: object = {
    languagesRaw: {},
    languages: [],
  
  };

  constructor(
    public _data: DataService,
    public _http: HttpClient,
    public _router: Router
  ) { }

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
    this._router.navigateByUrl('/profile');
  }

}
