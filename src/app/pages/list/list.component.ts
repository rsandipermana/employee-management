import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employee } from '../../interfaces/employee.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pages: number[] = [];
  pageSize: number = 10;
  sortKey: string = 'firstName';
  sortDirection: string = 'asc';
  searchKeyword: string = '';

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => {
        this.employees = employees;
        this.filteredEmployees = employees;
        this.applyFiltered();
      });
  }

  onPageChange(currentPage: number): void {
    this.currentPage = currentPage;
    localStorage.setItem('currentPage', currentPage.toString());
    this.applyFiltered()
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    localStorage.setItem('pageSize', pageSize.toString());
    this.applyFiltered()
  }

  onSortChange(sortDirection: string): void {
    this.sortDirection = sortDirection;
    localStorage.setItem('sortDirection', (sortDirection));
    this.applyFiltered()
  }

  onSearchChange(searchKeyword: string): void {
    this.searchKeyword = searchKeyword.toLowerCase();
    localStorage.setItem('searchKeyword', (this.searchKeyword));
    this.applyFiltered()
  }

  sortTable(columnName: string) {
    if (columnName === this.sortKey) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortDirection = 'asc';
      this.sortKey = columnName;
    }
    localStorage.setItem('sortDirection', (this.sortDirection));
    localStorage.setItem('sortKey', (this.sortKey));
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
    this.totalPages = Math.ceil(this.filteredEmployees.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.filteredEmployees = this.filteredEmployees.slice(startIndex, endIndex);
  }

  deleteEmployee(employee: Employee): void {
    console.log('Deleted employee:', employee);
  }

  editEmployee(employee: Employee): void {
    this.router.navigate(['/detail', employee.guid]);
  }
}
