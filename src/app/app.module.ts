import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MatchComponent } from './match/match.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

import { DataService } from './service/data.service';
import { UserService } from './service/user.service';
import { RouterModule, Routes } from '@angular/router'
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { PublicSingleProfileComponent } from './public-single-profile/public-single-profile.component';


const routerConfig: Routes = [
  {'path': '', 'component': HomeComponent},
  {'path': 'home', 'component': HomeComponent},

  // POST - login & register
  {'path': 'register', 'component': RegisterComponent},
  {

    // POST - company/profile
    'path': 'editProfile',
    'component': EditProfileComponent,
    'canActivate': [AuthGuard]
  },

  {
    // GET - user profile (populated)
    'path': 'userProfile',
    'component': ProfileComponent,
    'canActivate': [AuthGuard]
  },

  // GET - companies/:id - public profile
  {'path': 'profile/:id', 'component': PublicSingleProfileComponent},

  // Match - Filters
  {'path': 'connect', 'component': MatchComponent},
  {'path': '**', 'component': HomeComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    MatchComponent,
    ProfileComponent,
    EditProfileComponent,
    PublicSingleProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routerConfig),
    FormsModule
  ],
  providers: [DataService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
