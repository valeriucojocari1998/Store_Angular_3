import { JobOffer } from '../../../../shared/models/job-offer';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  private jobsUrl = 'api/job_offers/';
  constructor(private http: HttpClient) {}

  getJobs(): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(this.jobsUrl);
  }

  addJob(job: JobOffer): Observable<JobOffer> {
    return this.http.post<JobOffer>(this.jobsUrl, job);
  }

  editJob(job: JobOffer): Observable<any> {
    return this.http.put(this.jobsUrl + job.id, job);
  }

  deleteJob(jobId: string): Observable<any> {
    return this.http.delete(this.jobsUrl + jobId);
  }
}
