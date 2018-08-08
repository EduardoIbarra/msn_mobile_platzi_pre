import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class ConversationService {
  constructor(private angularFireDatabase: AngularFireDatabase){}
  add(conversation) {
    return this.angularFireDatabase.object('conversations/' + conversation.uid + '/' + conversation.timestamp).set(conversation);
  }
  getById(uid) {
    return this.angularFireDatabase.list('conversations/' + uid);
  }
}
