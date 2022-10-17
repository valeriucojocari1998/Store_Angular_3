import { ProductsUtilityService } from '../modules/products/services/utility/products-utility.service';
import { Injectable } from '@angular/core';
import {
  Action,
  createSelector,
  NgxsOnInit,
  Selector,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { patch, removeItem } from '@ngxs/store/operators';
import { Observable, tap } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductOffer } from 'src/app/shared/models';
import { ProductsFilters } from '../modules/products/models/products-filters';
import { ProductsApiService } from '../modules/products/services/api/products-api.service';
import {
  GetProductsAction,
  FilterProductsAction,
  DeleteProductAction,
  LoadMoreProductsAction,
  ToggleFavoriteProductAction,
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
  favorites: [
    '634c45e61c77dbbb0895c733',
    '634c45e6e38452e6138609f4',
    '634c45e69c1d1bc24851aad7',
    '634c45e69b678e551bef1ec2',
    '634c45e6bb7f25dc344ed3f8',
    '634c45e6482646f5262577b1',
    '634c45e652a465a93d7a2984',
    '634c45e6f251965cf5f17369',
    '634c45e64674d8912fb3faf3',
    '634c45e63d9f3b58d419bf77',
    '634c45e6afeadd72026b3481',
  ],
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

  ngxsOnInit({ dispatch }: StateContext<any>): void {
    dispatch(new GetProductsAction());
  }

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

  public static isProductFavorite(
    productId: string
  ): (state: ProductsStateModel) => boolean {
    return createSelector(
      [PRODUCTS_STATE_TOKEN],
      ({ favorites }: ProductsStateModel) => {
        return favorites.includes(productId);
      }
    );
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

  @Action(ToggleFavoriteProductAction)
  public toggleFavoriteProduct(
    { patchState, getState }: StateContext<ProductsStateModel>,
    { id }: ToggleFavoriteProductAction
  ): void {
    const { favorites } = getState();
    const isFavorite = favorites.includes(id);
    let newFavorites: string[];

    if (isFavorite) {
      newFavorites = favorites.filter((favId) => favId !== id);
    } else {
      newFavorites = [...favorites, id];
    }

    patchState({ favorites: newFavorites });
  }
}
