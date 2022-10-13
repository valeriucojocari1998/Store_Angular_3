import { ProductTag } from 'src/app/shared/enums';
import { Injectable } from '@angular/core';
import { JobOffer, PriceRange } from './../../../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ProductsUtilityService {
  constructor() {}

  filterJobOffersByPriceRange(
    jobOffers: JobOffer[],
    priceRange: PriceRange
  ): JobOffer[] {
    if (!priceRange || !jobOffers?.length) {
      return [...jobOffers];
    }
    return [
      ...jobOffers?.filter(
        (offer) =>
          offer.startingPrice > priceRange?.minPrice &&
          offer.startingPrice < priceRange?.maxPrice
      ),
    ];
  }

  filterJobOffersByTags(jobOffers: JobOffer[], tags: ProductTag[]): JobOffer[] {
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
    jobOffers: JobOffer[],
    page: number,
    pageSize: number = 20
  ) {
    return jobOffers.splice(0, (page + 1) * pageSize);
  }
}
