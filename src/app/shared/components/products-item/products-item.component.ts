import { ToggleFavoriteProductAction } from '../../../+state/products.actions';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { ProductOffer } from 'src/app/shared/models';
import { ProductsState } from 'src/app/+state/products.state';
import { ProductItemConfig } from '../../models/product-item-config';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss'],
})
export class ProductsItemComponent implements OnInit {
  @Input() productOffer: ProductOffer;
  @Input() disabledEditing: boolean = false;
  @Input() editingLoading: boolean = false;
  @Input() hideEditing: boolean = false;
  @Input() size: ProductItemConfig;
  @Output() editEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteEmitter: EventEmitter<string> = new EventEmitter<string>();

  public isFavorite$: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getFavoriteStatus();
  }

  getFavoriteStatus(): void {
    this.isFavorite$ = this.store.select(
      ProductsState.isProductFavorite(this.productOffer.id)
    );
  }

  editProductOffer(): void {}

  deleteProductOffer(): void {
    this.deleteEmitter.emit(this.productOffer.id);
  }

  toggleFavoriteProduct(): void {
    this.store.dispatch(new ToggleFavoriteProductAction(this.productOffer.id));
  }
}
