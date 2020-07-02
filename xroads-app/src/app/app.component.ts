import { Component, OnInit } from '@angular/core';
import { DrawerItem, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { Router } from '@angular/router';
import { UserInfo } from './models/user-info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Crossroads PCA Web App';
  public expanded = false;
  public selected = 'Deacons';
  public items: Array<any> = [];
  public canLogin = true;
  public canLogout = false;
  public logButtonText = 'Login';
  public greeting: string;
  userInfo: UserInfo;

  constructor(private router: Router) {}
  //   const routes: any[] = router.config;

  //   routes.forEach(route => {
  //     this.items.push({
  //         text: route.text,
  //         path: route.path ? route.path : '',
  //         icon: route.icon
  //     });
  // });

  //   this.items[0].selected = true;
// }
  async  ngOnInit() {
    const routes: any[] = this.router.config;

    routes.forEach(route => {
      this.items.push({
          text: route.text,
          path: route.path ? route.path : '',
          icon: route.icon
      });
    });

    this.items[0].selected = true;

    this.userInfo = await this.getUserInfo();
}

// async ngOnInit() {
//   this.userInfo = await this.getUserInfo();
// }

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

  // public items: Array<DrawerItem> = [
  //     { text: 'Deacons', icon: 'k-i-wrench', selected: true },
  //     { separator: true },
  //     { text: 'Nursery', icon: 'k-i-preview' },
  //     { text: 'Ushers', icon: 'k-i-gears' },
  //     // { separator: true },
  //     // { text: 'Attachments', icon: 'k-i-hyperlink-email' },
  //     // { text: 'Favourites', icon: 'k-i-star-outline' }
  // ];

  // public onSelect(ev: DrawerSelectEvent): void {
  //     this.selected = ev.item.text;
  // }

  onLogon() {
    if (this.canLogin) {
      this.canLogin = false;
      this.canLogout = false;
    } else {
      this.canLogin = true;
      this.canLogout = false;
      this.logButtonText = 'Login';
      this.greeting = '';
    }

  }

  // onLogOut() {
  //   this.canLogin = true;
  //   this.canLogout = false;
  //   this.logButtonText = 'Login';
  //   this.greeting = '';
  // }

  checkUser() {
    if (this.userInfo) {
      this.canLogin = false;
      this.canLogout = true;
      this.logButtonText = 'Logout';
      this.greeting = 'Hi ' + this.userInfo.userDetails;
    } else {
      this.canLogin = true;
      this.canLogout = false;
      this.greeting = '';
    }
  }

  goAuth(provider: string) {
    const { pathname } = window.location;
    const redirect = `post_login_redirect_uri=${pathname}`;
    const url = `/.auth/login/${provider}?${redirect}`;
    window.location.href = url;
    // this.userInfo = {identityProvider: 'facebook', userDetails: 'Van', userId: '', userRoles: [] };
    this.checkUser();
  }


}
