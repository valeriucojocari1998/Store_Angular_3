import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { DEFAULT_JOBS } from '../config/db';

@Injectable({
  providedIn: 'root',
})
export class InMemoryApiService implements InMemoryDbService {
  constructor() {}

  createDb(reqInfo?: RequestInfo): Observable<{}> | {} {
    return {
      job_offers: DEFAULT_JOBS,
    };
  }
}
