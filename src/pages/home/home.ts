import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {ConversationPage} from "../conversation/conversation";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  goToLogin() {
    this.navCtrl.push(LoginPage)
  }
  goToConversation() {
    this.navCtrl.push(ConversationPage)
  }

}
