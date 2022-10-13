import { ProductsFilters } from './../models/products-filters';
import { JobOffer } from '../../../shared/models/job-offer';

export class GetProductsAction {
  public static readonly type = '[Products] get products';

  constructor() {}
}

export class FilterProductsAction {
  public static readonly type = '[Products] filter products';

  constructor(public filters?: ProductsFilters) {}
}

export class AddProductAction {
  public static readonly type = '[Products] add product';

  constructor(public jobOffer: JobOffer) {}
}

export class EditProductAction {
  public static readonly type = '[Products] edit product';

  constructor(public jobOffer: JobOffer, public id: string) {}
}

export class DeleteProductAction {
  public static readonly type = '[Products] delete product';

  constructor(public id: string) {}
}

export class ToggleFavoriteProductAction {
  public static readonly type = '[Products] toggle favorite product';

  constructor(public id: string) {}
}
