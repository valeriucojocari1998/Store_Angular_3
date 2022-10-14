import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsItemListComponent } from './products-item-list.component';

describe('ProductsItemListComponent', () => {
  let component: ProductsItemListComponent;
  let fixture: ComponentFixture<ProductsItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsItemListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
