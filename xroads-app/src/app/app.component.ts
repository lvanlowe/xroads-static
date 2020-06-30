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
  ngOnInit(): void {
    const routes: any[] = this.router.config;

    routes.forEach(route => {
      this.items.push({
          text: route.text,
          path: route.path ? route.path : '',
          icon: route.icon
      });
    });

    this.items[0].selected = true;

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

  goAuth(provider) {
    // const { pathname } = window.location;
    // const redirect = `post_login_redirect_uri=${pathname}`;
    // const url = `/.auth/login/${provider}?${redirect}`;
    // window.location.href = url;
    this.userInfo = {identityProvider: 'facebook', userDetails: 'Van', userId: '', userRoles:[] }
  }
}
