import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { catchError, Observable } from 'rxjs';

import { ProductOffer } from './../../../../shared/models';
import { ProductsState } from '../../../../+state/products.state';
import {
  DeleteProductAction,
  GetProductsAction,
  LoadMoreProductsAction,
} from '../../../../+state/products.actions';

@Component({
  selector: 'app-products-board',
  templateUrl: './products-board.component.html',
  styleUrls: ['./products-board.component.scss'],
})
export class ProductsBoardComponent {
  @Select(ProductsState.getProductOffers) productOffers$: Observable<
    ProductOffer[]
  >;
  @Select(ProductsState.getMorePossible) morePossible$: Observable<number>;
  @Select(ProductsState.getIsLoadingProducts) isLoading$: Observable<boolean>;
  isDisabledEditing: boolean = false;
  editingItem: string = '';

  constructor(private store: Store) {}

  loadMoreProductOffers(): void {
    this.store.dispatch(new LoadMoreProductsAction());
  }

  deleteProductOffer(id: string): void {
    this.editingItem = id;
    this.isDisabledEditing = true;
    this.store
      .dispatch(new DeleteProductAction(id))
      .pipe(catchError((error) => error))
      .subscribe(() => {
        this.editingItem = '';
        this.isDisabledEditing = false;
      });
  }
}
