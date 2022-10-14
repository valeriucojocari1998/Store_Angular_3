import { JobOffer } from './../../../../shared/models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-item-list',
  templateUrl: './products-item-list.component.html',
  styleUrls: ['./products-item-list.component.scss'],
})
export class ProductsItemListComponent implements OnInit {
  @Input() jobOffers: JobOffer[] = [];

  constructor() {}

  ngOnInit(): void {}
}
