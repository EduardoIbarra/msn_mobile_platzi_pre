import { Component, ViewChild } from '@angular/core';
import {AlertController, App, ModalController, Nav, NavController, Platform, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {LoginPage} from "../pages/login/login";
import {ProfilePage} from "../pages/profile/profile";
import {UserService} from "../services/user";
import {AuthService} from "../services/auth";
import {RequestService} from "../services/request";
import {User} from "../interfaces/user";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  user: User;
  requests: any;
  mailsShown: any = [];
  constructor(private app: App, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private userService: UserService, private authService: AuthService, private requestService: RequestService, private modalController: ModalController, private alertController: AlertController, private toastController: ToastController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Profile', component: ProfilePage }
    ];
    this.authService.getStatus().subscribe((session) => {
      if (!session) {
        return;
      }
      if (!session.uid) {
        return;
      }
      this.userService.getById(session.uid).valueChanges().subscribe((user: User) => {
        this.user = user;
        this.getFriendRequests();
      }, (error) => {console.log(error);})
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  getFriendRequests() {
    this.requestService.getRequestsForEmail(this.user.email).valueChanges().subscribe((requests: any) => {
      console.log(requests);
      this.requests = requests;
      this.requests = this.requests.filter((r) => {
        return r.status !== 'accepted' && r.status !== 'rejected';
      });
      this.requests.forEach((r) => {
        if (this.mailsShown.indexOf(r.sender.email) === -1){
          this.mailsShown.push(r.sender.email);
          this.showRadio(r);
        }
      });
    }, (error) => {
      console.log(error);
    })
  }
  showRadio(r) {
    let alert = this.alertController.create();
    alert.setTitle('Solicitud de Amistad');
    alert.setMessage(r.sender.nick + 'te ha enviado una solicitud, deseas aceptar?');
    alert.addInput({
      type: 'radio',
      label: 'Claro',
      value: 'yes',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'No',
      value: 'no'
    });
    alert.addButton({
      text: 'OK',
      handler: data => {
        if (data === 'yes') {
          this.requestService.setRequestStatus(r, 'accepted').then((data) => {
            this.userService.addFriend(this.user.uid, r.sender.uid);
          }).catch((error) => {
            console.log(error);
          });
        } else {
          this.requestService.setRequestStatus(r, 'accepted').then((data) => {
            console.log('Solicitud Rechazada');
          }).catch((error) => {
            console.log(error);
          });
        }
      }
    });
    alert.present();
  }

  logout() {
    this.authService.logout().then(() => {
      this.app.getRootNav().setRoot(LoginPage);
    }).catch((error) => {
      console.log(error);
    });
  }
}
