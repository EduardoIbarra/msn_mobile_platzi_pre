import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import {HomePage} from "../home/home";
import {Status, User} from "../../interfaces/user";
import {AuthService} from "../../services/auth";
import {UserService} from "../../services/user";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  password: string;
  password2: string;
  email: string;
  status: Status;
  nick: string;
  operation: string = 'login';
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public userService: UserService, private toastCtrl: ToastController) {
  }
  registerWithEmail() {
    if(this.password !== this.password2) {
      alert('Las contraseñas no coinciden');
      return;
    }
    this.authService.registerWithEmail(this.email, this.password).then((data) => {
      const user: User = {
        nick: this.nick,
        email: this.email,
        status: this.status,
        uid: data.user.uid,
        active: true
      };
      this.userService.add(user).then((data) => {
        let toast = this.toastCtrl.create({
          message: 'Usuario registrado con éxito',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.operation = 'login';
        console.log(data);
      }).catch((error) => {
        alert('Ocurrió un error');
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  }
  loginWithEmail() {
    this.authService.loginWithEmail(this.email, this.password).then((data) => {
      console.log(data);
      let toast = this.toastCtrl.create({
        message: 'Bienvenido',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      this.navCtrl.setRoot(HomePage);
    }).catch((error) => {
      alert('Ocurrió un error');
      console.log(error);
    })
  }
  facebookAuth() {
    this.authService.facebookAuth().then((data) => {
      console.log(data);
      const user: User = {
        nick: data.user.displayName,
        email: data.user.email,
        status: Status.Online,
        uid: data.user.uid,
        active: true
      };
      if(data.additionalUserInfo.isNewUser) {
        this.userService.add(user).then((data) => {
          let toast = this.toastCtrl.create({
            message: 'Conectado a Facebook con éxito',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          this.navCtrl.push(HomePage);
        }).catch((error) => {
          alert('Ocurrió un error');
          console.log(error);
        });
      }else {
        let toast = this.toastCtrl.create({
          message: 'Facebook Login Exitoso',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.navCtrl.push(HomePage);
      }
    }).catch((error) => {
      alert('Ocurrió un error');
      console.log(error);
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }
  backToHome() {
    this.navCtrl.pop();
  }

}
