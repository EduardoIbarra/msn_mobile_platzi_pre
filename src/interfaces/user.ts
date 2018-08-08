export enum Status {
  Online = 'Online',
  Offline = 'Offline',
  Busy = 'Busy',
  AppearOffline = 'Appear Offline',
  Away = 'Away'
}
export interface User {
  nick: string;
  age?: number;
  active: boolean;
  status: Status;
  uid: any;
  email: string;
  avatar?: string;
  friends?: any;
}
