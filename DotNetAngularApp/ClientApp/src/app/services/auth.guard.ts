import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private toasty: ToastyService,
        private userService: UserService
        ) { }
    
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
            if (localStorage.getItem('token') != null) {
                let roles = next.data['permittedRoles'] as Array<string>;
                if(roles){
                  if(this.userService.roleMatch(roles)) return true;
                  else{
                    this.errorToasty('User not authorized', 'User does not have the privileges to access this page');
                    return false;
                  }
                }
                return true;
            }
            else {
              this.errorToasty('User not authorized', 'Please login as admin');
              this.router.navigate(['/pages/user/login']);
              return false;
        }
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
}