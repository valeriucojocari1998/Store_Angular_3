import { ProductTag } from 'src/app/shared/enums';
import { Injectable } from '@angular/core';
import { ProductOffer, PriceRange } from './../../../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ProductsUtilityService {
  constructor() {}

  filterJobOffersBy;

  filterJobOffersByPriceRange(
    jobOffers: ProductOffer[],
    priceRange: PriceRange
  ): ProductOffer[] {
    if (!priceRange || !jobOffers?.length) {
      return [...jobOffers];
    }
    return [
      ...jobOffers?.filter(
        (offer) =>
          offer.price > priceRange?.minPrice &&
          offer.price < priceRange?.maxPrice
      ),
    ];
  }

  filterJobOffersByTags(
    jobOffers: ProductOffer[],
    tags: ProductTag[]
  ): ProductOffer[] {
    if (!jobOffers?.length || !tags?.length) {
      return [...jobOffers];
    }
    return [
      ...jobOffers?.filter((offer) =>
        tags?.some(
          (tag) =>
            tag.toString().toLowerCase() === offer.tag.toString().toLowerCase()
        )
      ),
    ];
  }

  filterJobOffersByPageAndSize(
    jobOffers: ProductOffer[],
    page: number,
    pageSize: number = 20
  ) {
    return [...jobOffers].splice(0, (page + 1) * pageSize);
  }
}
