import { JobOffer } from './../../../../shared/models';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products-item-list',
  templateUrl: './products-item-list.component.html',
  styleUrls: ['./products-item-list.component.scss'],
})
export class ProductsItemListComponent implements OnInit {
  @Input() jobOffers: JobOffer[] = [];
  @Input() editingItem: string = '';
  @Input() isDisabledEditing: boolean = false;
  @Output() deleteEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  deleteJobOffer(id: string): void {
    this.deleteEmitter.emit(id);
  }
}
