import { ProductTag } from 'src/app/shared/enums';
import { PriceRange } from 'src/app/shared/models';

export class ProductsFilters {
  page: number = 0;
  pageSize: number = 20;
  isActive?: boolean;
  isCompany?: boolean;
  priceRange?: PriceRange;
  tags?: ProductTag[];

  constructor(filters?: Partial<ProductsFilters>) {
    if (filters) {
      Object.assign(this, filters);
    }
  }
}
