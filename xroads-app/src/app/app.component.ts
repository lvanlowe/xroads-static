import { Component } from '@angular/core';
import { DrawerItem, DrawerSelectEvent } from '@progress/kendo-angular-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Crossroads PCA Web App';
  public selected = 'Deacons';

  public items: Array<DrawerItem> = [
      { text: 'Deacons', icon: 'k-i-wrench', selected: true },
      { separator: true },
      { text: 'Nursery', icon: 'k-i-preview' },
      { text: 'Ushers', icon: 'k-i-gears' },
      // { separator: true },
      // { text: 'Attachments', icon: 'k-i-hyperlink-email' },
      // { text: 'Favourites', icon: 'k-i-star-outline' }
  ];

  public onSelect(ev: DrawerSelectEvent): void {
      this.selected = ev.item.text;
  }
}
