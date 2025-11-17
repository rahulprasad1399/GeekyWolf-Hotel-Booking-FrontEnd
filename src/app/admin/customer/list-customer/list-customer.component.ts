import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../../model/model.component';

@Component({
  selector: 'app-list-customer',
  imports: [],
  templateUrl: './list-customer.component.html',
  styleUrl: './list-customer.component.scss',
})
export class ListCustomerComponent {
  customerService = inject(CustomerService);
  destroyRef = inject(DestroyRef);

  customers = signal<Customer[]>([]);

  getAllCustomers() {
    const subscription = this.customerService.GetAllCustomers().subscribe({
      next: (data) => this.customers.set(data),
      error: (err) => console.log(err),
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  ngOnInit() {
    this.getAllCustomers();
  }
}
