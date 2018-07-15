import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class ConversationService {
  constructor(private angularFireDataBase: AngularFireDatabase) {
  }
  add(conversation) {
    return this.angularFireDataBase.object('/conversations/' + conversation.uid + '/' + conversation.timestamp).set(conversation);
  }
}
