import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductsState } from './+state/products.state';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsBoardComponent } from './pages/products-board/products-board.component';
import { ProductsFilterBarComponent } from './components/products-filter-bar/products-filter-bar.component';
import { ProductsItemListComponent } from './components/products-item-list/products-item-list.component';
import { ProductsItemComponent } from './components/products-item/products-item.component';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';

@NgModule({
  declarations: [
    ProductsBoardComponent,
    ProductsFilterBarComponent,
    ProductsItemListComponent,
    ProductsItemComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgxsModule.forFeature([ProductsState]),
    SharedMaterialModule,
    FlexLayoutModule,
  ],
})
export class ProductsModule {}
