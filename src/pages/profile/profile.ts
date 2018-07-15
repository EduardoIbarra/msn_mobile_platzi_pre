import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {AuthService} from "../../services/auth";
import {UserService} from "../../services/user";
import {Status, User} from "../../interfaces/user";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: User = {nick: '', status: Status.Online, active: true, email: '', uid: ''};
  status = Status;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public userService: UserService, public toastCtrl: ToastController) {
    this.authService.getStatus().subscribe((data) => {
      this.userService.getById(data.uid).valueChanges().subscribe((user: User) => {
        console.log(user);
        this.user = user;
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  saveProfile() {
    this.userService.edit(this.user).then((data) => {
      let toast = this.toastCtrl.create({
        message: 'Guardado con éxito',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }).catch((error) => {
      console.log(error);
    });
  }

}
