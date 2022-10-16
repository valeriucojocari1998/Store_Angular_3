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
import { patch, removeItem } from '@ngxs/store/operators';
import { Observable, tap } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { JobOffer } from 'src/app/shared/models';
import { ProductsFilters } from './../models/products-filters';
import { ProductsApiService } from '../services/api/products-api.service';
import {
  GetProductsAction,
  FilterProductsAction,
  DeleteProductAction,
  LoadMoreProductsAction,
} from './products.actions';

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
export class ProductsState {
  constructor(
    private productsApiService: ProductsApiService,
    private productsUtilityService: ProductsUtilityService
  ) {}

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
    return totalFiltered - filteredJobOffers?.length > -1
      ? totalFiltered - filteredJobOffers?.length
      : 0;
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

    const jobOffersFilteredByIsActive = !!newFilters.isActive
      ? jobOffers.filter((offer) => offer.isActive)
      : [...jobOffers];
    const jobOffersFilteredByIsCompany = !!newFilters.isCompany
      ? jobOffersFilteredByIsActive.filter((offer) => offer.isCompany)
      : [...jobOffersFilteredByIsActive];
    const jobOffersFilteredByPrice =
      this.productsUtilityService.filterJobOffersByPriceRange(
        jobOffersFilteredByIsCompany,
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
      savedFilters: newFilters,
    });
  }

  @Action(LoadMoreProductsAction)
  loadMoreProducts({ getState, dispatch }): void {
    const { savedFilters } = getState();
    const newFilters = {
      ...savedFilters,
      page: savedFilters.page + 1,
    };

    dispatch(new FilterProductsAction(newFilters));
  }

  @Action(DeleteProductAction)
  public deleteProduct(
    { setState, dispatch }: StateContext<ProductsStateModel>,
    { id }: DeleteProductAction
  ): Observable<any> {
    return this.productsApiService.deleteJob(id).pipe(
      tap(() =>
        setState(
          patch({
            jobOffers: removeItem<JobOffer>((offer) => offer.id === id),
          })
        )
      ),
      switchMap(() => dispatch(new FilterProductsAction()))
    );
  }
}
