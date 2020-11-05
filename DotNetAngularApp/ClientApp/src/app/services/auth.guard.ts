import { ToastyService } from 'ng2-toasty';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
                    // this.router.navigate(['/pages/forbidden']);
                    this.toasty.error({
                        title: 'User not authorized', 
                        msg: 'Please login as admin',
                        theme: 'bootstrap',
                        showClose: true,
                        timeout: 4000
                      });
                    return false;
                  }
                }
                return true;
            }
            else {
                this.toasty.error({
                    title: 'User not authorized', 
                    msg: 'Please login as admin',
                    theme: 'bootstrap',
                    showClose: true,
                    timeout: 4000
                  });
                this.router.navigate(['/pages/user/login']);
                return false;
        }
    }
}