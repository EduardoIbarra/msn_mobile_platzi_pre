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
  constructor(public navCtrl: NavController, public userService: UserService) {
    this.users = this.userService.get();
    console.log(this.users);

    let yuliana: User = {
      name: 'Yuliana',
      age: 26,
      active: false,
      status: Status.Offline
    };
    this.userService.add(yuliana);
    console.log(this.users);
  }


  goToLogin() {
    this.navCtrl.push(LoginPage)
  }
  goToConversation(user) {
    this.navCtrl.push(ConversationPage, {data: user});
  }

}
