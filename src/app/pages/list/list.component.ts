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
  sortKey: string = 'firstName';
  sortDirection: string = 'asc';
  searchKeyword: string = '';

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
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
    this.applyFiltered()
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
    this.applyFiltered()
  }

  applyFiltered(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.filteredEmployees = this.employees.filter(employee => {
      return (employee.username + employee.firstName + employee.lastName + employee.email).toLowerCase().includes(this.searchKeyword)
    })
    .sort((a: Employee, b: Employee) => {
      if (a[this.sortKey] < b[this.sortKey]) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (a[this.sortKey] > b[this.sortKey]) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    })
    .slice(startIndex, endIndex);
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
