import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  formDataRegis: {};
  loginSubscription2: Subscription;
  regisSubscription: Subscription;
  regisEmail: string;
  regisPassword: string;

  formDataLogin: any = {};
  loginSubscription: Subscription;
  loginEmail: string;
  loginPassword: string;

  constructor(
    public _formData: UserService,
    public _http: HttpClient,
    public _router: Router
  ) {

    this.loginSubscription2 = _formData.loggedData.subscribe(
      (newValue) => {
        if (newValue['logged'] === true) {
          this._router.navigateByUrl('/myprofile');
        }
      }
    );
    this.regisSubscription = _formData.formData.subscribe(
      (newValue) => {
        this.formDataRegis = newValue;
      }
    );
    this.loginSubscription = _formData.formData.subscribe(
      (newValue) => {
        this.formDataLogin = newValue;
        // if register ok user logged in and send to profile
        if (this.formDataLogin.message.indexOf('Successfully') !== -1) {
          this._formData.login(this.regisEmail, this.regisPassword);
          this._router.navigateByUrl('/myprofile');
        }
        console.log(this.formDataLogin);

        if (this.formDataLogin.logged === true) {
          console.log('bla bla bla bla ');

        }
      }
    );

  }


  sendRegister(form: FormControl): void {
    if (form.valid) {
      this._formData.register(this.regisEmail, this.regisPassword);

    }
  }

  sendLogin(form: FormControl): void {
    if (form.valid) {
      this._formData.login(this.loginEmail, this.loginPassword);

    }
  }
}
