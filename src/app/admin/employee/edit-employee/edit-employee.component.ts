import { Component } from '@angular/core';
import { EmployeeFormComponent } from "../employee-form/employee-form.component";

@Component({
  selector: 'app-edit-employee',
  imports: [EmployeeFormComponent],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss'
})
export class EditEmployeeComponent {

}
