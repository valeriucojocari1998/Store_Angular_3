import { ProductOffer } from 'src/app/shared/models';
import { Observable } from 'rxjs';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { ProductsState } from 'src/app/+state/products.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Select(ProductsState.getFavorites) favorites$: Observable<ProductOffer[]>;
  constructor() {}

  ngOnInit() {
    this.listenScrollVertical();
  }

  listenScrollVertical(): void {
    const scrollContainer = document.getElementById('favoritesList');
    scrollContainer.addEventListener('wheel', (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY;
    });
  }
}
