import {Injectable} from "@angular/core";
import {Status, User} from "../interfaces/user";

@Injectable()
export class UserService {
  constructor() {
    console.log(Status);
  }
  private users: User[] = [
    {
      name: 'Eduardo',
      age: 28,
      active: true,
      status: Status.AppearOffline
    },
    {
      name: 'Freddy',
      age: 19,
      active: true,
      status: Status.Busy
    }
  ];
  get() {
    return this.users;
  }
  add(user: User) {
    this.users.push(user);
  }
}
