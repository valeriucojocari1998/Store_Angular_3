import { ProductsFilters } from '../modules/products/models/products-filters';
import { ProductOffer } from '../shared/models/product-offer';

export class GetProductsAction {
  public static readonly type = '[Products] get products';

  constructor() {}
}

export class FilterProductsAction {
  public static readonly type = '[Products] filter products';

  constructor(public filters?: ProductsFilters) {}
}

export class LoadMoreProductsAction {
  public static readonly type = '[Products] load more products';

  constructor() {}
}

export class AddProductAction {
  public static readonly type = '[Products] add product';

  constructor(public jobOffer: ProductOffer) {}
}

export class EditProductAction {
  public static readonly type = '[Products] edit product';

  constructor(public jobOffer: ProductOffer, public id: string) {}
}

export class DeleteProductAction {
  public static readonly type = '[Products] delete product';

  constructor(public id: string) {}
}

export class ToggleFavoriteProductAction {
  public static readonly type = '[Products] toggle favorite product';

  constructor(public id: string) {}
}
