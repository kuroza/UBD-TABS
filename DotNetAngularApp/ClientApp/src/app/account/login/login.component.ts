import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { stringify } from 'querystring';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  formModel = {
    Email: '',
    Password: ''
  }
  constructor(private service: UserService, private router: Router, private toasty: ToastyService) { }

  ngOnInit() {
    // user cannot access login page if already authenticated
    // redirect back to home
    if (localStorage.getItem('token') != null)
      this.router.navigateByUrl('/pages/home');
  }

  onSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.successToasty('Login successful', 'User successfully logged in');
        this.router.navigateByUrl('/pages/home');
      },
      err => {
        if (err.status == 400)
          this.errorToasty('Authentication failed', 'Incorrect email or password!');
        else if (err.status == 500)
          this.errorToasty('Authentication failed', '');
        else
          console.log(err);
      }
    );
  }

  private errorToasty(title: string, message: string) {
    this.toasty.error({
      title: title,
      msg: message,
      theme: 'bootstrap',
      showClose: true,
      timeout: 3000
    });
  }

  private successToasty(title: string, message: string) {
    this.toasty.success({
      title: title,
      msg: message,
      theme: 'bootstrap',
      showClose: true,
      timeout: 3000
    });
  }
}
