import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employee } from '../../interfaces/employee.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private alertService: AlertService, private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.employeeService.postLogin(this.username, this.password).subscribe(
      employee => {
        if (employee) {
          // Login success
          // user is authenticated, save token to local storage
          localStorage.setItem('auth_token', 'YOUR_AUTH_TOKEN_HERE');
          localStorage.setItem('user', JSON.stringify(employee));
          this.alertService.success('Hi there! You\'ve successfully signed in.');
          this.router.navigate(['/list']);
        } else {
          // Login failed
          // when unauthenticated
          this.alertService.error('Invalid username or password.');
        }
      },
      error => {
        // Handle error
      }
    );
  }
}
