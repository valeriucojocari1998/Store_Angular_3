import { ProductsState } from './+state/products.state';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsBoardComponent } from './pages/products-board/products-board.component';
import { ProductsFilterBarComponent } from './components/products-filter-bar/products-filter-bar.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductItemListComponent } from './components/product-item-list/product-item-list.component';

@NgModule({
  declarations: [
    ProductsBoardComponent,
    ProductsFilterBarComponent,
    ProductItemComponent,
    ProductItemListComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgxsModule.forFeature([ProductsState]),
  ],
})
export class ProductsModule {}
