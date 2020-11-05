import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styles: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(
    public service: UserService,
    private toastyService: ToastyService,
    private route: Router
    ) { }

    ngOnInit() {
      this.service.formModel.reset();
    }
  
    onSubmit() {
      this.service.register().subscribe(
        (res: any) => {
          if (res.succeeded) {
            this.service.formModel.reset();
            this.toastyService.success({
              title: 'Registration successful', 
              msg: 'New user created!',
              theme: 'bootstrap',
              showClose: true,
              timeout: 3000
            });
          this.route.navigateByUrl('/account/login');
          } else {
            res.errors.forEach(element => {
              switch (element.code) {
                case 'DuplicateUserName':
                  this.toastyService.error({
                    title: 'Registration failed', 
                    msg: 'Username is already taken!',
                    theme: 'bootstrap',
                    showClose: true,
                    timeout: 3000
                  });
                  break;
  
                default:
                this.toastyService.error(element.description);
                  break;
              }
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    }

}
