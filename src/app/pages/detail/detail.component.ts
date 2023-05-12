import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../interfaces/employee.interface';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from "src/app/services/employee/employee.service";
import { CurrencyPipe, Location } from "@angular/common";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  guid: string = '';
  employee: Employee | undefined;
  employeeForm: FormGroup;

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private fb: FormBuilder, private currencyPipe: CurrencyPipe, private location: Location) {
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
    this.getEmployee();
  }

  getEmployee(): void {
    this.employeeService.getEmployee(this.guid)
      .subscribe(employee => {
        this.employee = employee;
        this.employeeForm.patchValue({
          username: employee?.username,
          password: employee?.password,
          firstName: employee?.firstName,
          lastName: employee?.lastName,
          email: employee?.email,
          basicSalary: this.currencyPipe.transform(employee?.basicSalary, 'Rp. ', 'symbol', '1.0-2'),
          status: employee?.status,
          group: employee?.group,
          birthDate: employee?.birthDate,
          description: employee?.description
        });
      });
  }

  onOk(): void {
    this.location.back();
  }
}
