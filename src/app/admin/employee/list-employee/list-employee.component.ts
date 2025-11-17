import { Component, DestroyRef, inject, signal } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../../model/model.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-list-employee',
  imports: [RouterLink],
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.scss',
})
export class ListEmployeeComponent {
  employeeService = inject(EmployeeService);
  destroyRef = inject(DestroyRef);

  constructor(private toastr: ToastrService) {}

  employee = signal<Employee[]>([]);
  modalIsOpen = signal(false);
  dataIdToDelete = signal<number>(0);

  getAllEmployees() {
    const subscription = this.employeeService.GetAllEmployee().subscribe({
      next: (data) => this.employee.set(data),
      error: (err) => console.log(err),
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  ngOnInit() {
    this.getAllEmployees();
  }

  onDelete(id: number) {
    this.modalIsOpen.set(true);
    this.dataIdToDelete.set(id);
  }

  onCancel() {
    this.modalIsOpen.set(false);
    this.dataIdToDelete.set(0);
  }

  onConfirm() {
    this.employeeService.DeleteEmployee(this.dataIdToDelete()).subscribe({
      next: (res) => {
        this.modalIsOpen.set(false);
        this.dataIdToDelete.set(0);
        this.toastr.success('Employee Deleted Successfully');
        this.getAllEmployees();
      },
      error: (err) => {
        this.modalIsOpen.set(false);
        this.dataIdToDelete.set(0);
        this.toastr.error('Failed to delete Employee');
      },
    });
  }
}
