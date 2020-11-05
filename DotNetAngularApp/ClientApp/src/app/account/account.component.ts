import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styles: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  onBackButton() {
    this._location.back();
  }

}
