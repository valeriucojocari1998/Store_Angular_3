import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { catchError, Observable } from 'rxjs';

import { JobOffer } from './../../../../shared/models';
import { ProductsState } from './../../+state/products.state';
import {
  DeleteProductAction,
  GetProductsAction,
  LoadMoreProductsAction,
} from '../../+state/products.actions';

@Component({
  selector: 'app-products-board',
  templateUrl: './products-board.component.html',
  styleUrls: ['./products-board.component.scss'],
})
export class ProductsBoardComponent implements OnInit {
  @Select(ProductsState.getJobOffers) jobOffers$!: Observable<JobOffer[]>;
  @Select(ProductsState.getMorePossible) morePossible$: Observable<number>;
  isLoadingItems: boolean = false;
  isDisabledEditing: boolean = false;
  editingItem: string = '';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loadInitialJobOffers();
  }

  loadInitialJobOffers(): void {
    this.isLoadingItems = true;
    this.store
      .dispatch(new GetProductsAction())
      .pipe(catchError((error) => error))
      .subscribe(() => (this.isLoadingItems = false));
  }

  loadMoreJobOffers(): void {
    this.isLoadingItems = true;
    this.store
      .dispatch(new LoadMoreProductsAction())
      .pipe(catchError((error) => error))
      .subscribe(() => (this.isLoadingItems = false));
  }

  deleteJobOffer(id: string): void {
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
