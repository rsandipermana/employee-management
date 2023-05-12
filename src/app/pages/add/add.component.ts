import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../interfaces/employee.interface';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from "src/app/services/employee/employee.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  guid: string = '';
  employee: Employee | undefined;
  employeeForm: FormGroup;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      basicSalary: ['', Validators.required],
      status: ['', Validators.required],
      group: ['', Validators.required],
      birthDate: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.guid = this.route.snapshot.paramMap.get('guid') ?? '';
  }

  getEmployees(): void {
    this.employeeService.getEmployee(this.guid)
      .subscribe(employee => {
        this.employee = employee;
      });
  }

  onSubmit(): void {
    const newEmployee: Employee = this.employeeForm.value;
    // add any additional logic to prepare the new employee object
    // then add the new employee to the array or send it to the backend API
  }
}
