import { ProductsFilters } from './../../models/products-filters';
import { ProductTag } from 'src/app/shared/enums';
import { Injectable } from '@angular/core';
import { ProductOffer, PriceRange } from './../../../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ProductsUtilityService {
  constructor() {}

  filterProductOffers(
    productOffers: ProductOffer[],
    filters: ProductsFilters
  ): ProductOffer[] {
    const productOffersFilteredByIsActive = !!filters.isActive
      ? productOffers.filter((offer) => offer.isActive)
      : [...productOffers];
    const productOffersFilteredByPrice = this.filterProductOffersByPriceRange(
      productOffersFilteredByIsActive,
      filters.priceRange
    );
    const productOffersFilteredByTag = this.filterProductOffersByTags(
      productOffersFilteredByPrice,
      filters.tags
    );
    const productOffersFilteredByPage = this.filterProductOffersByPageAndSize(
      productOffersFilteredByTag,
      filters.page,
      filters.pageSize
    );

    return productOffersFilteredByPage;
  }

  private filterProductOffersByPriceRange(
    productOffers: ProductOffer[],
    priceRange: PriceRange
  ): ProductOffer[] {
    if (!priceRange || !productOffers?.length) {
      return [...productOffers];
    }
    return [
      ...productOffers?.filter(
        (offer) =>
          offer.price > priceRange?.minPrice &&
          offer.price < priceRange?.maxPrice
      ),
    ];
  }

  private filterProductOffersByTags(
    productOffers: ProductOffer[],
    tags: ProductTag[]
  ): ProductOffer[] {
    if (!productOffers?.length || !tags?.length) {
      return [...productOffers];
    }
    return [
      ...productOffers?.filter((offer) =>
        tags?.some(
          (tag) =>
            tag.toString().toLowerCase() === offer.tag.toString().toLowerCase()
        )
      ),
    ];
  }

  private filterProductOffersByPageAndSize(
    productOffers: ProductOffer[],
    page: number,
    pageSize: number = 20
  ) {
    return [...productOffers].splice(0, (page + 1) * pageSize);
  }
}
