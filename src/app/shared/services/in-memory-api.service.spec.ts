/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InMemoryApiService } from './in-memory-api.service';

describe('Service: InMemoryApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InMemoryApiService]
    });
  });

  it('should ...', inject([InMemoryApiService], (service: InMemoryApiService) => {
    expect(service).toBeTruthy();
  }));
});
