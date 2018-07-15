import {Component, Input, OnInit} from '@angular/core';
import {Status, User} from "../../interfaces/user";
import {UserService} from "../../services/user";

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
  @Input() user_id: string;
  user: User;
  constructor(public userService: UserService) {
  }
  ngOnInit() {
    console.log(this.user_id);
    this.userService.getById(this.user_id).valueChanges().subscribe((data: User) => {
      this.user = data;
    }, (error) => {
      console.log(error);
    });
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
