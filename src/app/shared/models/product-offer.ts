import { Guid } from 'guid-typescript';
import { ProductTag } from '../enums';
import { User } from './user';

export class ProductOffer {
  id: string = Guid.create().toString();
  isActive: boolean = false;
  price: number = 0;
  picture: string = '';
  timeLeft: number = 604800000;
  about: string = '';
  title: string = '';
  tag: ProductTag | string = '';
  customer: User = new User();

  constructor(jobOffer?: Partial<ProductOffer>) {
    if (jobOffer) {
      Object.assign(this, jobOffer);
    }
  }
}
