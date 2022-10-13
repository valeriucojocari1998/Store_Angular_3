import { ProductsUtilityService } from './../services/utility/products-utility.service';
import { Injectable } from '@angular/core';
import {
  Action,
  NgxsOnInit,
  Selector,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { JobOffer } from 'src/app/shared/models';
import { ProductsFilters } from './../models/products-filters';
import { ProductsApiService } from '../services/api/products-api.service';
import { GetProductsAction, FilterProductsAction } from './products.actions';

export interface ProductsStateModel {
  jobOffers: JobOffer[];
  filteredJobOffers: JobOffer[];
  totalFiltered: number;
  favorites: string[];
  savedFilters: ProductsFilters;
}

export const ProductsDefaults: ProductsStateModel = {
  jobOffers: [],
  filteredJobOffers: [],
  totalFiltered: 0,
  favorites: [],
  savedFilters: new ProductsFilters(),
};

export const PRODUCTS_STATE_TOKEN = new StateToken<ProductsStateModel>(
  'products'
);

@State({
  name: PRODUCTS_STATE_TOKEN,
  defaults: ProductsDefaults,
})
@Injectable({
  providedIn: 'root',
})
export class ProductsState implements NgxsOnInit {
  constructor(
    private productsApiService: ProductsApiService,
    private productsUtilityService: ProductsUtilityService
  ) {}

  ngxsOnInit({ dispatch }: StateContext<ProductsStateModel>): void {
    dispatch(new GetProductsAction());
  }

  @Selector([PRODUCTS_STATE_TOKEN])
  public static getJobOffers({
    filteredJobOffers,
  }: ProductsStateModel): JobOffer[] {
    return filteredJobOffers;
  }

  @Selector([PRODUCTS_STATE_TOKEN])
  public static getMorePossible({
    totalFiltered,
    filteredJobOffers,
  }: ProductsStateModel): number {
    return totalFiltered - filteredJobOffers?.length;
  }

  @Selector([PRODUCTS_STATE_TOKEN])
  public static getFavorites({
    jobOffers,
    favorites,
  }: ProductsStateModel): JobOffer[] {
    return jobOffers?.filter((offer) => favorites?.includes(offer.id));
  }

  @Selector([PRODUCTS_STATE_TOKEN])
  public static getFilters({
    savedFilters,
  }: ProductsStateModel): ProductsFilters {
    return savedFilters;
  }

  @Action(GetProductsAction)
  public getJobOffers({
    patchState,
    dispatch,
  }: StateContext<ProductsStateModel>): Observable<void> {
    return this.productsApiService.getJobs().pipe(
      tap((jobOffers) => patchState({ jobOffers })),
      switchMap(() => dispatch(new FilterProductsAction()))
    );
  }

  @Action(FilterProductsAction)
  public filterProducts(
    { getState, patchState }: StateContext<ProductsStateModel>,
    { filters }: FilterProductsAction
  ): void {
    const { jobOffers, savedFilters } = getState();
    const newFilters = filters ?? savedFilters;
    console.log('filters ', newFilters);

    const jobOffersFilteredByPrice =
      this.productsUtilityService.filterJobOffersByPriceRange(
        jobOffers,
        newFilters.priceRange
      );
    const jobOffersFilteredByTag =
      this.productsUtilityService.filterJobOffersByTags(
        jobOffersFilteredByPrice,
        newFilters.tags
      );
    const jobOffersFilteredByPage =
      this.productsUtilityService.filterJobOffersByPageAndSize(
        jobOffersFilteredByTag,
        newFilters.page,
        newFilters.pageSize
      );

    patchState({
      totalFiltered: jobOffersFilteredByTag.length,
      filteredJobOffers: jobOffersFilteredByPage,
    });
  }
}
