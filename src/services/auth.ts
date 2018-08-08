import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  constructor(private firebaseAuth: AngularFireAuth) {
  }
  registerWithEmail(email, password) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  loginWithEmail(email, password) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }
  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.firebaseAuth.auth.signInWithPopup(provider);
  }
  getStatus() {
    return this.firebaseAuth.authState;
  }
  logout() {
    return this.firebaseAuth.auth.signOut();
  }
}
