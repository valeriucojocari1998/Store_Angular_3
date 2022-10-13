export class UserName {
  firstName: string = '';
  secondName: string = '';

  constructor(userName?: Partial<UserName>) {
    if (userName) {
      Object.assign(this, userName);
    }
  }
}
