import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../../model/model.component';
import { DatePipe } from "@angular/common"

@Component({
  selector: 'app-list-review',
  imports: [DatePipe],
  templateUrl: './list-review.component.html',
  styleUrl: './list-review.component.scss',
})
export class ListReviewComponent implements OnInit {
  reviewService = inject(ReviewService);
  destroyRef = inject(DestroyRef);

  reviews = signal<Review[]>([]);

  getAllReviews() {
    const subscription = this.reviewService.GetAllReviews().subscribe({
      next: (data) => this.reviews.set(data),
      error: (err) => console.log(err),
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  ngOnInit() {
    this.getAllReviews();
  }
}
