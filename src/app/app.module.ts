import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from '../pages/login/login';
import {ConversationPage} from '../pages/conversation/conversation';
import {UserService} from '../services/user';
import {SearchPipe} from '../pipes/search';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthService} from "../services/auth";
import {ProfilePageModule} from "../pages/profile/profile.module";
import {AngularFireStorageModule} from "angularfire2/storage";
import {Camera} from "@ionic-native/camera";
import {Geolocation} from "@ionic-native/geolocation";
import {HttpClientModule} from "@angular/common/http";
import {ConversationService} from "../services/conversation";
import {Vibration} from "@ionic-native/vibration";
import {RequestService} from "../services/request";
import {ComponentsModule} from "../components/components.module";
export const firebaseConfig = {
  apiKey: "AIzaSyDkFgZLQg_IXEqO7mJTO_03atZVaihnXoA",
  authDomain: "platzinger-6a959.firebaseapp.com",
  databaseURL: "https://platzinger-6a959.firebaseio.com",
  projectId: "platzinger-6a959",
  storageBucket: "platzinger-6a959.appspot.com",
  messagingSenderId: "264241877711"
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ConversationPage,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ProfilePageModule,
    AngularFireStorageModule,
    HttpClientModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ConversationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    AuthService,
    Camera,
    Geolocation,
    ConversationService,
    Vibration,
    RequestService
  ]
})
export class AppModule {}
