import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { JobOffer } from './../../../../shared/models';
import { ProductsState } from './../../+state/products.state';

@Component({
  selector: 'app-products-board',
  templateUrl: './products-board.component.html',
  styleUrls: ['./products-board.component.scss'],
})
export class ProductsBoardComponent implements OnInit {
  @Select(ProductsState.getJobOffers) jobOffers$!: Observable<JobOffer[]>;
  constructor(private store: Store) {}

  ngOnInit(): void {}
}
