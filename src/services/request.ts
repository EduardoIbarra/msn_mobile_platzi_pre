import {Injectable} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class RequestService {
  constructor(private angularFireDatabase: AngularFireDatabase){}
  createRequest(request) {
    const cleanEmail = request.receiver_email.replace('.', ',');
    return this.angularFireDatabase.object('requests/' + cleanEmail + '/' + request.sender.uid).set(request);
  }
  setRequestStatus(request, status) {
    const cleanEmail = request.receiver_email.replace('.', ',');
    return this.angularFireDatabase.object('requests/' + cleanEmail + '/' + request.sender.uid + '/status').set(status);
  }
  getRequestsForEmail(email) {
    const cleanEmail = email.replace('.', ',');
    return this.angularFireDatabase.list('requests/' + cleanEmail);
  }
}
