import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert/alert.service';
import DataJSON from "../../../assets/data.json";

interface User {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  users: User[] = DataJSON.users;

  constructor(private router: Router, private alertService: AlertService) {
  }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    const user = this.users.find(u => u.username === f.value.username && u.password === f.value.password);
    if (user) {
      // user is authenticated, save token to local storage
      localStorage.setItem('auth_token', 'YOUR_AUTH_TOKEN_HERE');
      localStorage.setItem('user', JSON.stringify(user));
      this.alertService.success('Hi there! You\'ve successfully signed in.');
      this.router.navigate(['/list']);
    } else {
      // when unauthenticated
      this.alertService.error('Invalid username or password.');
    }
  }
}
