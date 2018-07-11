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

  }
  goToLogin() {
    this.navCtrl.push(LoginPage)
  }
  goToConversation() {
    this.navCtrl.push(ConversationPage);
  }

}
