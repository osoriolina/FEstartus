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


const routerConfig: Routes = [
  {'path': '', 'component': HomeComponent},
  {'path': 'home', 'component': HomeComponent},
  {'path': 'register', 'component': RegisterComponent},
  {
    'path': 'editProfile',
    'component': EditProfileComponent,
    'canActivate': [AuthGuard]
  },

  {
    'path': 'profile',
    'component': ProfileComponent,
    'canActivate': [AuthGuard]
  },

  {'path': 'profile/:id', 'component': ProfileComponent},
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
    EditProfileComponent
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
