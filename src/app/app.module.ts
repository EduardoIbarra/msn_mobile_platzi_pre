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
import {ProfilePage} from "../pages/profile/profile";
import {Camera} from "@ionic-native/camera";
export const firebaseConfig = {
  apiKey: 'AIzaSyB1WZRwZRHy9L6jwgqYgOlTvf7yPCC33hQ',
  authDomain: 'msnalive2.firebaseapp.com',
  databaseURL: 'https://msnalive2.firebaseio.com',
  projectId: 'msnalive2',
  storageBucket: 'msnalive2.appspot.com',
  messagingSenderId: '18390215590'
};
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ConversationPage,
    SearchPipe,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFontAwesomeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ConversationPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    AuthService,
    Camera
  ]
})
export class AppModule {}
