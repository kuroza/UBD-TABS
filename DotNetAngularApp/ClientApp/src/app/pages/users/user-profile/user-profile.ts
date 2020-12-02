import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.html',
})
export class UserProfileComponent implements OnInit {
  
  userDetails;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserProfile()
      .subscribe(
        res => this.userDetails = res,
        err => console.log(err));
  }
}