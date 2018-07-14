import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase';

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
  facebookAuth() {
    return this.firebaseAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }
}
