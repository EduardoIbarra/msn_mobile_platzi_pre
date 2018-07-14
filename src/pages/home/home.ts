import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {ConversationPage} from "../conversation/conversation";
import {UserService} from "../../services/user";
import {Status, User} from "../../interfaces/user";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: User[];
  query: string;
  status = Status;
  constructor(public navCtrl: NavController, public userService: UserService) {
    const usersObservable = this.userService.get();
    usersObservable.valueChanges().subscribe((data: User[]) => {
      this.users = data;
    }, (error) => {
      alert('Ocurrió un error');
      console.log(error);
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

}
