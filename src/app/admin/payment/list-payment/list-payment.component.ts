import { Component, DestroyRef, inject, signal } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { Payment, PaymentMethod, PaymentStatus } from '../../../model/model.component';
import { DatePipe } from "@angular/common"

@Component({
  selector: 'app-list-payment',
  imports: [DatePipe],
  templateUrl: './list-payment.component.html',
  styleUrl: './list-payment.component.scss',
})
export class ListPaymentComponent {
  paymentService = inject(PaymentService);
  destroyRef = inject(DestroyRef);

  paymentStatus = PaymentStatus
  paymentMethod = PaymentMethod

  payments = signal<Payment[]>([]);

  getAllPayments() {
    const subscription = this.paymentService.GetAllPayments().subscribe({
      next: (data) => this.payments.set(data),
      error: (err) => console.log(err),
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  ngOnInit() {
    this.getAllPayments();
  }
}
