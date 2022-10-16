import { ProductOffer } from '../../../../shared/models/product-offer';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  private jobsUrl = 'api/job_offers/';
  constructor(private http: HttpClient) {}

  getJobs(): Observable<ProductOffer[]> {
    return this.http.get<ProductOffer[]>(this.jobsUrl);
  }

  addJob(job: ProductOffer): Observable<ProductOffer> {
    return this.http.post<ProductOffer>(this.jobsUrl, job);
  }

  editJob(job: ProductOffer): Observable<any> {
    return this.http.put(this.jobsUrl + job.id, job);
  }

  deleteJob(jobId: string): Observable<any> {
    return this.http.delete(this.jobsUrl + jobId);
  }
}
