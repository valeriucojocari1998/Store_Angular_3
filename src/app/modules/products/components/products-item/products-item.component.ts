import { Component, Input, OnInit } from '@angular/core';
import { JobOffer } from 'src/app/shared/models';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss'],
})
export class ProductsItemComponent implements OnInit {
  @Input() jobOffer!: JobOffer;

  constructor() {}

  ngOnInit(): void {}
}
