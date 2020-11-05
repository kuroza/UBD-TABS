import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { SaveUserRole } from '../models/user-role';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private fb: FormBuilder,
    private http: HttpClient) { }

  private readonly BaseURI = '/api';

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }

  login(formData) {
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
  }

  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile');
  }

  // getAllUsers() {
  //   return this.http.get(this.BaseURI + '/ApplicationUser/AllUsers')
  //     .pipe(map(response => response));
  // }

  async getAllUsers() {
    return this.http.get(this.BaseURI + '/ApplicationUser/AllUsers').toPromise();
  }

  updateUserRole(userRole: SaveUserRole) {
    return this.http.put(this.BaseURI + '/ApplicationUser/ManageUserRole', userRole)
      .pipe(map(response => response));
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

  hasAccess() {
    let roles = ['SuperAdmin', 'Admin'];
    if(roles){
      if(this.roleMatch(roles)) return true;
      else{
        return false;
      }
    }
    return false;
  }
}
