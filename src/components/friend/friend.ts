import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../services/user";
import {Status, User} from "../../interfaces/user";
import {ConversationPage} from "../../pages/conversation/conversation";
import {NavController} from "ionic-angular";

/**
 * Generated class for the FriendComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'friend',
  templateUrl: 'friend.html'
})
export class FriendComponent implements OnInit{

  text: string;
  @Input() uid: string;
  friend: User;
  constructor(private navCtrl: NavController, private userService: UserService) {
    console.log('Hello FriendComponent Component');
    this.text = 'Hello World';
  }
  ngOnInit() {
    this.userService.getById(this.uid).valueChanges().subscribe((data: User) => {
      this.friend = data;
      console.log(this.friend);
    }, (error) => {
      console.log(error);
    });
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
