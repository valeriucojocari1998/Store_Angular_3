import { ProductsFilters } from './../../models/products-filters';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { JobOffer } from './../../../../shared/models';
import { ProductsState } from './../../+state/products.state';
import { ProductsApiService } from '../../services/api/products-api.service';
import { FilterProductsAction } from '../../+state/products.actions';

@Component({
  selector: 'app-products-board',
  templateUrl: './products-board.component.html',
  styleUrls: ['./products-board.component.scss'],
})
export class ProductsBoardComponent implements OnInit {
  @Select(ProductsState.getJobOffers) jobOffers$!: Observable<JobOffer[]>;
  constructor(
    private productsApiService: ProductsApiService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.jobOffers$.subscribe((data) => console.log(data));
  }
}
