import { ProductsUtilityService } from './../services/utility/products-utility.service';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { patch, removeItem } from '@ngxs/store/operators';
import { Observable, tap } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductOffer } from 'src/app/shared/models';
import { ProductsFilters } from './../models/products-filters';
import { ProductsApiService } from '../services/api/products-api.service';
import {
  GetProductsAction,
  FilterProductsAction,
  DeleteProductAction,
  LoadMoreProductsAction,
} from './products.actions';

export interface ProductsStateModel {
  productOffers: ProductOffer[];
  filteredProductOffers: ProductOffer[];
  totalFiltered: number;
  favorites: string[];
  savedFilters: ProductsFilters;
}

export const ProductsDefaults: ProductsStateModel = {
  productOffers: [],
  filteredProductOffers: [],
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
  public static getProductOffers({
    filteredProductOffers: filteredJobOffers,
  }: ProductsStateModel): ProductOffer[] {
    return filteredJobOffers;
  }

  @Selector([PRODUCTS_STATE_TOKEN])
  public static getMorePossible({
    totalFiltered,
    filteredProductOffers: filteredJobOffers,
  }: ProductsStateModel): number {
    return totalFiltered - filteredJobOffers?.length > -1
      ? totalFiltered - filteredJobOffers?.length
      : 0;
  }

  @Selector([PRODUCTS_STATE_TOKEN])
  public static getFavorites({
    productOffers: jobOffers,
    favorites,
  }: ProductsStateModel): ProductOffer[] {
    return jobOffers?.filter((offer) => favorites?.includes(offer.id));
  }

  @Selector([PRODUCTS_STATE_TOKEN])
  public static getFilters({
    savedFilters,
  }: ProductsStateModel): ProductsFilters {
    return savedFilters;
  }

  @Action(GetProductsAction)
  public getProductOffers({
    patchState,
    dispatch,
  }: StateContext<ProductsStateModel>): Observable<void> {
    return this.productsApiService.getJobs().pipe(
      tap((jobOffers) => patchState({ productOffers: jobOffers })),
      switchMap(() => dispatch(new FilterProductsAction()))
    );
  }

  @Action(FilterProductsAction)
  public filterProducts(
    { getState, patchState }: StateContext<ProductsStateModel>,
    { filters }: FilterProductsAction
  ): void {
    const { productOffers: jobOffers, savedFilters } = getState();
    const newFilters = filters ?? savedFilters;

    const jobOffersFilteredByIsActive = !!newFilters.isActive
      ? jobOffers.filter((offer) => offer.isActive)
      : [...jobOffers];
    const jobOffersFilteredByPrice =
      this.productsUtilityService.filterJobOffersByPriceRange(
        jobOffersFilteredByIsActive,
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
      filteredProductOffers: jobOffersFilteredByPage,
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
            productOffers: removeItem<ProductOffer>((offer) => offer.id === id),
          })
        )
      ),
      switchMap(() => dispatch(new FilterProductsAction()))
    );
  }
}
