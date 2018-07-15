import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserService} from "../../services/user";
import {AuthService} from "../../services/auth";
import {User} from "../../interfaces/user";
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
  friend: User;
  user: User;
  ids: any[] = [];
  message: string = '';
  conversation: any;
  shake:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService, public authService: AuthService, public conversationService: ConversationService) {
    const friend_id = this.navParams.get('data');
    this.userService.getById(friend_id).valueChanges().subscribe((data: User) => {
      this.friend = data;
      this.authService.getStatus().subscribe((result) => {
        this.userService.getById(result.uid).valueChanges().subscribe((user: User) => {
          this.user = user;
          this.ids = [this.user.uid, this.friend.uid].sort();
          this.getConversation();
        })
      });
    }, (error) => {
      console.log(error);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConversationPage');
  }
  sendMessage() {
    const messageObject: any = {
      uid: this.ids.join('||'),
      timestamp: Date.now(),
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'text',
      content: this.message.replace(/\n$/, '')
    };
    const audio = new Audio('assets/sound/new_message.m4a');
    audio.play();
    this.conversationService.add(messageObject).then(() => {
    });
    this.message = '';
  }
  doZumbido() {
    const audio = new Audio('assets/sound/zumbido.m4a');
    audio.play();
    this.shake = true;
    window.setTimeout(() => {
      this.shake = false;
    }, 800);
  }
  sendZumbido() {
    this.doZumbido();
    const messageObject: any = {
      uid: this.ids.join('||'),
      timestamp: Date.now(),
      sender: this.user.uid,
      receiver: this.friend.uid,
      type: 'zumbido',
    };
    this.conversationService.add(messageObject);
  }
  getConversation() {
    this.conversationService.getById(this.ids.join('||')).valueChanges().subscribe((data) => {
      this.conversation = data;
    }, (error) => {
      console.log(error);
    });
  }
  getUserNickById(id) {
    if (id === this.friend.uid) {
      return this.friend.nick;
    } else if (id === this.user.uid) {
      return this.user.nick;
    }
  }
}
