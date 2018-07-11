import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {ConversationPage} from "../conversation/conversation";
import {Status, User} from "../../interfaces/user";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    let a = 1;
    let b = "2";
    console.log(a+b); // output: 12

    let c: number = 1;
    let d: number = 2;
    console.log(c+d); // output: 3

    let e: string = '1';
    let f: string = '2';
    console.log(e+f); // output: 12

    let g: boolean = true;
    let h: object = {};
    console.log(g, h); console.log(e+f); // output: true {}

    let i = ['hello', 3, null, {}, undefined];
    console.log(i);  // output: ["hello", 3, null, {…}, undefined]

    let j: boolean [] = [true, false];
    console.log(j); // output: [true, false]

    let k: object [] = [{}, {}];
    console.log(k); // output: [{}, {}]

    let l: any = 1;
    l = "1";
    l = true;
    l = {};
    l = [];
    console.log(l); // output: []

    enum Direction {
      Up = 1,
      Down = 2,
      Left = 3,
      Right = 4
    }
    console.log(Direction); // Output: {1: "Up", 2: "Down", 3: "Left", 4: "Right", Up: 1, Down: 2, Left: 3, Right: 4}
    console.log(Direction.Down); // Output: 2

    enum DirectionString {
      Up = "UP",
      Down = "DOWN",
      Left = "LEFT",
      Right = "RIGHT"
    }
    console.log(DirectionString.Down); // Output: DOMN

    let eduardo: User = {
      name: 'Eduardo',
      age: 28,
      active: true,
      status: Status.AppearOffline
    };
    let freddy: User = {
      name: 'Freddy',
      age: 19,
      active: true,
      status: Status.Online
    };
    console.log(eduardo, freddy); // Output: {name: "Eduardo", age: 28, active: true, status: "Appear Offline"} {name: "Freddy", age: 19, active: true, status: "Online"}
  }


  goToLogin() {
    this.navCtrl.push(LoginPage)
  }
  goToConversation() {
    this.navCtrl.push(ConversationPage);
  }

}
