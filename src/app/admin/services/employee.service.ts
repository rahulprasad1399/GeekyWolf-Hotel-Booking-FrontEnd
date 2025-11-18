import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Employee } from '../../model/model.component';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  http = inject(HttpClient);

  GetAllEmployee() {
    return this.http.get<Employee[]>('https://localhost:7006/api/Employee');
  }

  GetEmployeeById(id: string) {
    return this.http.get<Employee>(`https://localhost:7006/api/Employee/${id}`);
  }

  CreateEmployee(employee: any) {
    return this.http.post('https://localhost:7006/api/Employee', employee,{withCredentials : true});
  }

  UpdateEmployee(id: string, employee: any) {
    return this.http.put(`https://localhost:7006/api/Employee/${id}`, employee,{withCredentials : true});
  }

  DeleteEmployee(id: number) {
    return this.http.delete(`https://localhost:7006/api/Employee/${id}`,{withCredentials : true});
  }
}
