import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { SaveUserRole } from '../../../models/user-role';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'manage-user',
  templateUrl: './manage-user.component.html',
  styles: []
})
export class ManageUserComponent implements OnInit {
  
  requiredAlert: boolean = false;

  users: any;
  userRole: SaveUserRole = {
    id: '',
    role: ''
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toasty: ToastyService) { }

  async ngOnInit() {
    this.users = await this.userService.getAllUsers();
  }

  submit() {
    var result$ = this.userService.updateUserRole(this.userRole);

    result$.subscribe(() => {
      this.toasty.success({
        title: 'Success', 
        msg: 'User role was sucessfully saved.',
        theme: 'bootstrap',
        showClose: true,
        timeout: 3000
      });
      this.redirectTo('/pages/users/manage');
    },
    err => {
      if (err.status == 400) {
        this.requiredAlert = true;
      }
    });
  }

  onClose() {
    this.requiredAlert = false;
  }

  delete(id) {
    // if (confirm("Are you sure?")) {
    //   this.userService.delete(id) // delete API
    //     .subscribe(() => {
    //       this.toasty.success({
    //         title: 'Success', 
    //         msg: 'User was sucessfully deleted.',
    //         theme: 'bootstrap',
    //         showClose: true,
    //         timeout: 3000
    //       });
    //       this.redirectTo('/pages/users/manage');
    //     });
    // }
  }

  edit(id) {
    this.userRole.id = id;
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
