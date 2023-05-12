import { Component, OnInit } from '@angular/core';
import { AlertService } from './services/alert/alert.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  message: any;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => {
      this.message = message;
      if (this.message) {
        setTimeout(() => {
          this.closeAlert();
        }, 3000);
      }
    });
  }

  closeAlert() {
    this.message = null;
  }
}
