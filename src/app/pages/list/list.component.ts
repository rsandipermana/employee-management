import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employee } from '../../interfaces/employee.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  sortDirection: string = 'asc';
  searchKeyword: string = '';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => {
        this.employees = employees;
        this.filteredEmployees = employees;
        console.log(employees);
      });
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.currentPage = 1;
  }

  onSortChange(sortDirection: string): void {
    this.sortDirection = sortDirection;
  }

  onSearchChange(searchKeyword: string): void {
    this.searchKeyword = searchKeyword.toLowerCase();
    this.currentPage = 1;
    this.filteredEmployees = this.employees.filter(employee =>
      (employee.username + employee.firstName + employee.lastName + employee.email).toLowerCase().includes(this.searchKeyword)
    );
  }

  deleteEmployee(employee: Employee): void {
    // implement delete logic
    console.log('Deleted employee:', employee);
  }

  editEmployee(employee: Employee): void {
    // implement edit logic
    console.log('Edited employee:', employee);
  }
}
