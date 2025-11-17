import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Review } from '../../model/model.component';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  http = inject(HttpClient);

  GetAllReviews() {
    return this.http.get<Review[]>('https://localhost:7006/api/Review');
  }
}
