import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/models/user-info';

@Component({
  selector: 'app-usher-review',
  templateUrl: './usher-review.component.html',
  styleUrls: ['./usher-review.component.scss']
})
export class UsherReviewComponent implements OnInit {

  userInfo: UserInfo;
  canUpdate: boolean;

  constructor() { }

  async  ngOnInit() {

    this.userInfo = await this.getUserInfo();
    this.checkRoles();
  }

  checkRoles() {
    if (this.userInfo.userRoles.indexOf('admin') > -1) {
      this.canUpdate = true;
    }
    if (this.userInfo.userRoles.indexOf('usher') > -1) {
      this.canUpdate = true;
    }

  }

  async getUserInfo() {
    try {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      return clientPrincipal;
    } catch (error) {
      console.error('No profile could be found');
      return undefined;
    }
  }


}
