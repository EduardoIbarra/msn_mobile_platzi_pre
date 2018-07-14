import {Injectable} from "@angular/core";
import {User} from "../interfaces/user";
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class UserService {
  constructor(private angularFireDataBase: AngularFireDatabase) {
  }
  get() {
    return this.angularFireDataBase.list('users/');
  }
  add(user: User) {
    return this.angularFireDataBase.object('/users/' + user.uid).set(user);
  }
}
