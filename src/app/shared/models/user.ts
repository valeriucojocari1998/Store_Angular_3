import { UserName } from './user-name';

export class User {
  name: UserName = new UserName();
  email: string = '';
  phone: string = '';
  address: string = '';
  userDetails: string = '';

  constructor(user?: Partial<User>) {
    if (user) {
      Object.assign(this, user);
    }
  }
}
