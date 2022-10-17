import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsBoardComponent } from './pages/products-board/products-board.component';
import { ProductsFilterBarComponent } from './components/products-filter-bar/products-filter-bar.component';
import { SharedModule } from './../../shared/shared.module';
import { ProductsItemListComponent } from './components/products-item-list/products-item-list.component';

@NgModule({
  declarations: [
    ProductsBoardComponent,
    ProductsFilterBarComponent,
    ProductsItemListComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule, SharedModule],
})
export class ProductsModule {}
