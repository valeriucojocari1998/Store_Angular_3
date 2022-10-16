import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ProductOffer } from 'src/app/shared/models';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss'],
})
export class ProductsItemComponent {
  @Input() jobOffer!: ProductOffer;
  @Input() disabledEditing: boolean = false;
  @Input() editingLoading: boolean = false;
  @Output() editEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() deleteEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  editJobOffer(): void {}

  deleteJobOffer(): void {
    this.deleteEmitter.emit(this.jobOffer.id);
  }
}
