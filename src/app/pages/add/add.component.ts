import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../interfaces/employee.interface';
import { Location } from "@angular/common";
import { AlertService } from "src/app/services/alert/alert.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  employee: Employee | undefined;
  employeeForm: FormGroup;

  constructor(private alertService: AlertService, private fb: FormBuilder, private location: Location) {
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
  }

  onSubmit(): void {
    this.alertService.success('Hi there! You\'ve successfully signed in.');
    this.location.back();
  }
}
