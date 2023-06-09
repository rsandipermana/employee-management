import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from "../../interfaces/employee.interface";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeesUrl = 'assets/employees.json';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl);
  }

  getEmployee(guid: string): Observable<Employee | undefined> {
    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        map(employees => employees.find(e => e.guid === guid))
      );
  }

  postLogin(username: string, password: string): Observable<Employee | undefined> {
    return this.http.get<Employee[]>(this.employeesUrl)
      .pipe(
        map(employees => employees.find(e => e.username === username && e.password === password))
      );
  }
}
