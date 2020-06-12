import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Welcome to Crossroads PCA Web App';

  items: any[] = [{
    text: 'Item1',
    items: [{ text: 'Item1.1' }, { text: 'Item1.2', items: [{ text: 'Item1.2.1' }, { text: 'Item1.2.2' }] }]
}, {
    text: 'Item2',
    items: [{ text: 'Item2.1' }, { text: 'Item2.2' }, { text: 'Item2.3' }]
}, {
    text: 'Item3'
}];
  constructor() { }

  ngOnInit() {
  }

  onButtonClick() {
      this.title = 'Hello from Kendo UI!';
  }
}
