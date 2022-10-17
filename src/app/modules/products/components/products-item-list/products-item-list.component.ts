import { ProductItemConfig } from '../../../../shared/models/product-item-config';
import { ProductOffer } from '../../../../shared/models';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products-item-list',
  templateUrl: './products-item-list.component.html',
  styleUrls: ['./products-item-list.component.scss'],
})
export class ProductsItemListComponent implements OnInit {
  @Input() productOffers: ProductOffer[] = [];
  @Input() editingItem: string = '';
  @Input() isDisabledEditing: boolean = false;
  @Input() itemSize: ProductItemConfig = { width: '400px', height: '400px' };
  @Input() hideEditing: boolean = false;
  @Output() deleteEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  deleteJobOffer(id: string): void {
    this.deleteEmitter.emit(id);
  }
}
