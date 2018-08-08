import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {User} from "../../interfaces/user";
import {AuthService} from "../../services/auth";
import {UserService} from "../../services/user";
import {ConversationService} from "../../services/conversation";

/**
 * Generated class for the ConversationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})
export class ConversationPage {
  user: User;
  friend: User;
  conversationId: any;
  message: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthService, public userService: UserService, public conversationService: ConversationService) {
    this.friend = this.navParams.get('data');
    console.log(this.user);
    this.authService.getStatus().subscribe((data) => {
      this.userService.getById(data.uid).valueChanges().subscribe((user: User) => {
        this.user = user;
        let idsArray = [this.user.uid, this.friend.uid].sort();
        this.conversationId = idsArray.join('||');
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationPage');
  }
  goToHome() {
    this.navCtrl.push(HomePage);
  }
  backToHome() {
    this.navCtrl.pop();
  }
  sendMessage() {
    const messageObject: any = {
      uid: this.conversationId,
      timestamp: Date.now(),
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'text',
      content: this.message
    };
    this.conversationService.add(messageObject).then((data) => {
      this.message = '';
    }).catch((error) => {
      console.log(error);
    });
  }
}
