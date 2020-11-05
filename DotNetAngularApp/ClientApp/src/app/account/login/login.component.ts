import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
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
        this.router.navigateByUrl('/pages/home');
        // window.location.reload();
        this.toasty.success({
          title: 'Login successful', 
          msg: 'User successfully logged in!',
          theme: 'bootstrap',
          showClose: true,
          timeout: 3000
        });
      },
      err => {
        if (err.status == 400)
          this.toasty.error({
            title: 'Authentication failed', 
            msg: 'Incorrect email or password!',
            theme: 'bootstrap',
            showClose: true,
            timeout: 3000
          });
        else
          console.log(err);
      }
    );
  }

}
