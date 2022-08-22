import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InMemoryApiService implements InMemoryDbService {
  constructor() {}

  createDb(
    reqInfo?: RequestInfo | undefined
  ): {} | Observable<{}> | Promise<{}> {
    throw new Error('Method not implemented.');
  }
}
