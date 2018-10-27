import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MongodbService } from '../shared/mongodb.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private mongodb: MongodbService, private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/contacts']);
    }
  }

  onSubmit(form: NgForm) {

    const values = form.value;

    const payload = {
      username: values.username,
      password: values.password
    };

    // console.log(payload);
    this.mongodb.postLogin(payload)
      .subscribe(res => {
        this.auth.setToken(res['token']);
        this.router.navigate(['/contacts']);
      });
  }
}
