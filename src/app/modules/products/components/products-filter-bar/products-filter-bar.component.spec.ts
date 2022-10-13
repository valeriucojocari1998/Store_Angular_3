import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsFilterBarComponent } from './products-filter-bar.component';

describe('ProductsFilterBarComponent', () => {
  let component: ProductsFilterBarComponent;
  let fixture: ComponentFixture<ProductsFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsFilterBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
