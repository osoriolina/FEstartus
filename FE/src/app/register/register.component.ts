import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { UserService } from '../service/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registeredUser: boolean = false;

  formDataRegis: any = {};
  loginSubscription: Subscription;
  regisSubscription: Subscription;
  regisEmail: string;
  regisPassword: string;

  formDataLogin: any = {};
  loginEmail: string;
  loginPassword: string;

  constructor(
    public _formData: UserService,
    public _http: HttpClient,
    public _router: Router
  ) {

    this.loginSubscription = _formData.loggedData.subscribe(
      (newValue) => {
        if (newValue['logged'] === true) {
          this._router.navigateByUrl('/myprofile');
        }
      }
    );
    
    this.regisSubscription = _formData.formData.subscribe(
      (newValue) => {
        this.formDataRegis = newValue;
        // if register ok user logged in and send to profile
        if (this.formDataRegis.message.indexOf('Successfully') !== -1) {
          this._formData.login(this.regisEmail, this.regisPassword);
        }
      }
    );
  }


  sendRegister(form: NgForm): void {
    if (form.valid) {
      this._formData.register(this.regisEmail, this.regisPassword);

    }
  }

  sendLogin(form: NgForm): void {
    if (form.valid) {
      this._formData.login(this.loginEmail, this.loginPassword);

    }
  }
}
