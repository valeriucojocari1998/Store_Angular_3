import { Guid } from 'guid-typescript';
import { ProductTag } from '../enums';
import { User } from './user';
import { UserOffer } from './user-offer';

export class JobOffer {
  id: string = Guid.create().toString();
  isActive: boolean = false;
  startingPrice: number = 0;
  picture: string = '';
  isCompany: boolean = false;
  timeLeft: number = 604800000;
  about: string = '';
  requirements: string[] = [];
  tag: ProductTag | string = '';
  offers: UserOffer[] = [];
  employer: User = new User();

  constructor(jobOffer?: Partial<JobOffer>) {
    if (jobOffer) {
      Object.assign(this, jobOffer);
    }
  }
}
