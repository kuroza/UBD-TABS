import { ToastyService } from 'ng2-toasty';
import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  templateUrl: './one-column.layout.html',
})
export class OneColumnLayoutComponent {

  isAuthenticated = false;

  constructor(
    private userService: UserService,
    private toasty: ToastyService
    ) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.isAuthenticated = true;
    }
  }
}
