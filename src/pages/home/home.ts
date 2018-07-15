import { Component } from '@angular/core';
import {AlertController, NavController, ToastController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {ConversationPage} from "../conversation/conversation";
import {UserService} from "../../services/user";
import {Status, User} from "../../interfaces/user";
import {RequestService} from "../../services/request";
import {AuthService} from "../../services/auth";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: User[];
  query: string;
  status = Status;
  user: User;
  constructor(public navCtrl: NavController, public userService: UserService, public alertCtrl: AlertController, public requestService: RequestService, public authService: AuthService, public toastCtrl: ToastController) {
    const usersObservable = this.userService.get();
    usersObservable.valueChanges().subscribe((data: User[]) => {
      this.users = data;
    }, (error) => {
      alert('Ocurrió un error');
      console.log(error);
    });
    this.authService.getStatus().subscribe((result) => {
      this.userService.getById(result.uid).valueChanges().subscribe((user: User) => {
        this.user = user;
        this.user.friends = Object.keys(this.user.friends).map(key => this.user.friends[key]);
      });
    });
  }


  goToLogin() {
    this.navCtrl.push(LoginPage)
  }
  goToConversation(user) {
    this.navCtrl.push(ConversationPage, {data: user});
  }
  getIconByStatus(status) {
    let icon = '';
    switch (status){
      case Status.Online:
        icon = 'logo_live_online.png';
        break;
      case Status.Offline:
        icon = 'logo_live_offline.png';
        break;
      case Status.Busy:
        icon = 'logo_live_busy.png';
        break;
      case Status.AppearOffline:
        icon = 'logo_live_appear_offline.png';
        break;
      case Status.Away:
        icon = 'logo_live_away.png';
        break;
    }
    return icon;
  }
  sendRequest() {
    const prompt = this.alertCtrl.create({
      title: 'Agregar Amigo',
      message: "Ingresa el email del amigo que deseas agregar. ¡Le enviaremos tu solicitud!",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        },
      ],
      buttons: [
        {text: 'Cancel',
          handler: data => {
            console.log(data);
          }
        },
        {text: 'Save',
          handler: data => {
            const request = {
              timestamp: Date.now(),
              receiver_email: data.email,
              sender: this.user,
              status: 'pending'
            };
            this.requestService.createRequest(request).then((data) => {
              let toast = this.toastCtrl.create({
                message: 'Solicitud Enviaoda',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
            }).catch((error) => {
              console.log(error);
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
