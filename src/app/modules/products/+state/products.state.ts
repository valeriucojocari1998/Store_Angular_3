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
  isLoadingProducts: boolean;
  favorites: string[];
  savedFilters: ProductsFilters;
}

export const ProductsDefaults: ProductsStateModel = {
  productOffers: [],
  filteredProductOffers: [],
  isLoadingProducts: false,
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
    filteredProductOffers,
  }: ProductsStateModel): ProductOffer[] {
    return filteredProductOffers;
  }

  @Selector([PRODUCTS_STATE_TOKEN])
  public static getMorePossible({
    productOffers,
    filteredProductOffers: filteredProductOffers,
  }: ProductsStateModel): number {
    return productOffers.length - filteredProductOffers?.length > -1
      ? productOffers.length - filteredProductOffers?.length
      : 0;
  }

  @Selector([PRODUCTS_STATE_TOKEN])
  public static getIsLoadingProducts({
    isLoadingProducts,
  }: ProductsStateModel): boolean {
    return isLoadingProducts;
  }

  @Selector([PRODUCTS_STATE_TOKEN])
  public static getFavorites({
    productOffers: productOffers,
    favorites,
  }: ProductsStateModel): ProductOffer[] {
    return productOffers?.filter((offer) => favorites?.includes(offer.id));
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
    patchState({ isLoadingProducts: true });
    return this.productsApiService.getJobs().pipe(
      tap((productOffers) => patchState({ productOffers: productOffers })),
      switchMap(() => dispatch(new FilterProductsAction())),
      tap(() => patchState({ isLoadingProducts: false }))
    );
  }

  @Action(FilterProductsAction)
  public filterProducts(
    { getState, patchState }: StateContext<ProductsStateModel>,
    { filters }: FilterProductsAction
  ): void {
    const { productOffers, savedFilters } = getState();
    const newFilters = filters ?? savedFilters;
    const filteredProductOffers =
      this.productsUtilityService.filterProductOffers(
        productOffers,
        newFilters
      );

    patchState({
      filteredProductOffers: filteredProductOffers,
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
